import * as types from '@/constants'

export const initialState = Object.freeze({
  list: [],
  ids: {},
})

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CATEGORIES_ASSIGN:
      return {
        ...state,
        list: action.payload,
        ids: {
          ...state.ids,
          ...action.payload.reduce((acc, cur) => ({...acc,[cur.id]:cur}), {}),
        }
      }
    default:
      return state
  }
}
