import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Task, RequireOnly } from '../lib/global'

export type TaskState = {
  entitites: Task[]
}
type TaskRequiredTitle = RequireOnly<Task, 'title'>
export const makeTask = (draftTask: TaskRequiredTitle): Task => {
  return {
    id: nanoid(),
    colunm: nanoid(),
    completed: false,
    ...draftTask,
  }
}
export const initialState: TaskState = {
  entitites: [],
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskRequiredTitle>) => {
      const task = makeTask(action.payload)
      state.entitites.push(task)
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      // or using index
      const index = state.entitites.findIndex(
        (task) => task.id === action.payload
      )
      state.entitites.splice(index, 1)
      // or using filter
      // state.entitites = state.entitites.filter(
      //   (task) => task.id !== action.payload
      // )
    },
  },
})

export const { addTask, removeTask } = taskSlice.actions
export default taskSlice.reducer
