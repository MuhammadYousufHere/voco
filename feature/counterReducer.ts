import { createReducer, createAction } from '@reduxjs/toolkit'

const increment = createAction('increment', () => ({
  payload: 1,
}))
const incrementByAmount = createAction(
  'incrementByAmount',
  (amount: number) => {
    return { payload: amount }
  }
)
const decrement = createAction('decrement', (amount: number) => ({
  payload: amount,
}))
const reset = createAction('reset', () => ({
  payload: 0,
}))

type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByAmount>
  | ReturnType<typeof reset>
// or
type CounterState = { count: 0 }
type CounterStateII = 'increment' | 'decrement' | 'incrementByAmount' | 'reset'

export const counterReducer = createReducer({ count: 0 }, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.count++
    })
    .addCase(decrement, (state) => {
      state.count--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.count += action.payload
    })
    .addCase(reset, (state) => {
      state.count = 0
    })
})

//  normal reducer

const reducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case increment.type:
      return { count: state.count + 1 }
    case decrement.type:
      return { count: state.count - 1 }
    case incrementByAmount.type:
      return { count: state.count + action.payload }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}
