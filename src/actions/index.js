import * as types from '../constants'
import {
  database,
  userLogout as _userLogout,
} from '../services/backend'
import { initialState as initialDatabasePayload } from '../reducers/money'


export const userLogin = (info) => async (dispatch, getState) => {
  dispatch({ type: types.USER_UPDATE, info })

  if (!info) return

  const { user } = getState()

  if (user.status !== 'unknown') return

  dispatch({ type: types.USER_STATUS, status: 'new' })

  const doc = await database().get()

  if (!doc.exists) {
    database().set({
      version: 2,
      initialDatabasePayload
    })
  }

  dispatch({ type: types.USER_STATUS, status: 'initialized' })
}

export const userLogout = () => _userLogout

export const moneyAssign = (payload) => ({
  type: types.MONEY_ASSIGN,
  payload: payload || {},
})

export const categoriesAssign = (payload) => ({
  type: types.CATEGORIES_ASSIGN,
  payload: payload || {},
})
