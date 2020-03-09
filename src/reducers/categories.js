import * as types from '../constants'

export const initialState = Object.freeze({
  expenseCategories: [],
})

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CATEGORIES_ASSIGN:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
