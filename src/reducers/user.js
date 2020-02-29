import * as types from '../constants'

const initialState = {
  info: {},
  isLogged: null,
  status: 'unknown'||'new'||'initialized',
}

export default function(state = initialState, action) {
  // eslint-disable-next-line no-console
  console.log('store:', action)

  if (types.USER_UPDATE === action.type) {
    return userUpdate(state, action)
  } else if (types.USER_STATUS === action.type) {
    return {
      ...state,
      status: action.status,
    }
  }

  return state
}

function userUpdate(state, action) {
  const { info } = action

  if (!info) {
    return {
      ...state,
      info: {},
      isLogged: false,
      status: 'unknown',
    }
  }

  return {
    ...state,
    info,
    isLogged: !info.isAnonymous,
  }
}
