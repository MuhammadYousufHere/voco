import { createApi } from '@reduxjs/toolkit/query'
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isRefreshing: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    startRefreshing: (state) => {
      state.isRefreshing = true
    },
    stopRefreshing: (state) => {
      state.isRefreshing = false
    },
  },
})

export const {
  setAccessToken,
  setRefreshToken,
  startRefreshing,
  stopRefreshing,
} = tokensSlice.actions

const axiosBaseQuery = async (args, api, extraOptions) => {
  const { baseUrl, serializeQueryArgs, axiosConfig } = api

  const url = `${baseUrl}${args.endpoint}`
  const { body, headers, method = 'GET', ...axiosOptions } = axiosConfig

  const axiosInstance = axios.create(axiosOptions)

  axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = store.getState().tokens.accessToken

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const refreshToken = store.getState().tokens.refreshToken

        if (!refreshToken) {
          return Promise.reject(error)
        }

        const isRefreshing = store.getState().tokens.isRefreshing

        if (isRefreshing) {
          // Wait for the new token before retrying the request
          await new Promise((resolve) => setTimeout(resolve, 1000))
          return axiosInstance(originalRequest)
        }

        store.dispatch(startRefreshing())

        try {
          const response = await axiosInstance.post('/refresh-token', {
            refreshToken,
          })

          const { accessToken, refreshToken: newRefreshToken } = response.data

          store.dispatch(setAccessToken(accessToken))
          store.dispatch(setRefreshToken(newRefreshToken))

          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        } finally {
          store.dispatch(stopRefreshing())
        }
      }

      return Promise.reject(error)
    }
  )

  try {
    const axiosResponse = await axiosInstance({
      method,
      url,
      data: body,
      headers: {
        ...headers,
        ...args.headers,
      },
      params: serializeQueryArgs(args.query),
      ...extraOptions,
    })

    return {
      data: axiosResponse.data,
      error: null,
    }
  } catch (axiosError) {
    return {
      data: null,
      error: {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
      },
    }
  }
}
