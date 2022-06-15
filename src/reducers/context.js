import * as types from '../constants'

export const initialState = Object.freeze({
  isOpen: false,
  optionList: [],
  header: null,
})

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CONTEXT_ASSIGN: {
      const hasOptions = (action.payload.optionList || []).length > 0
      const hasHeader = Boolean(action.payload.header)
      const isOpen = hasOptions || hasHeader

      return {
        ...state,
        isOpen,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

