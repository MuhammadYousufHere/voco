import taskReducer, { addTask, makeTask } from './TaskSlice'
describe('TaskSlice', () => {
  const initialState = {
    entitites: [makeTask({ title: 'test' }), makeTask({ title: 'test2' })],
  }
  it('should add task', () => {
    const task = makeTask({ title: 'test3' })
    const action = addTask(task)
    const newState = taskReducer(initialState, action)
    expect(newState.entitites).toEqual([task, ...initialState.entitites])
  })
})
