import * as types from '@/constants'

export const initialState = Object.freeze({
  amount: 0,
})

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MONEY_ASSIGN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
