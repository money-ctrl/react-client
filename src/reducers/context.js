import * as types from '../constants'

export const initialState = Object.freeze({
  isOpen: false,
  optionList: [],
})

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CONTEXT_ASSIGN:
      return {
        ...state,
        isOpen: (action.payload.optionList || []).length > 0,
        ...action.payload,
      }
    default:
      return state
  }
}

