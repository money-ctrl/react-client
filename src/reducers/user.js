import * as types from '../constants'

const initialState = {
  isLogged: null,
  info: {},
}

export default function(state = initialState, action) {
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
