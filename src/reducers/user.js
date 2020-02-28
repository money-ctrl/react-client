import * as types from '../constants'

const initialState = {
  isLogged: null,
  info: {},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_UPDATE:
      return {
        ...state,
        info: action.info || {},
        isLogged: action.info ? !action.info.isAnonymous : false,
      }
    default:
      return state
  }
}
