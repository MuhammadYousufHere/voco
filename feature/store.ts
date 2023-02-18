import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './TaskSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { api } from '@my/services/api-service'

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(api.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState> // use it in useSelector hook to get the state
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => useSelector<RootState, TSelected>(selector, equalityFn)
// or
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
export const useAppDispatchTyped: () => AppDispatch = useDispatchTyped
export default store
