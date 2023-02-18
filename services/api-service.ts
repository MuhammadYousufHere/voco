import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
export type Post = {
  userId: number
  id: number
  title: string
  body: string
}
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
    }),
    getPost: build.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
    getComments: build.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),
    getHalwa: build.query<Post, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetCommentsQuery,
  useGetHalwaQuery,
} = api
