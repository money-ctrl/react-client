import * as types from '../constants'

const initialState = {
  isLogged: null,
  info: {},
}

export default function(state = initialState, action) {
  // eslint-disable-next-line no-console
  console.log('[updade(user)]', action)

  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        info: action.info || {},
        isLogged: Boolean(action.info),
      }
    default:
      return state
  }
}
