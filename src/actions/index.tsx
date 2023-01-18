import * as types from '@/constants'
import {
  database,
  userLogout as _userLogout,
} from '@/services/backend'
import { initialState as initialDatabasePayload } from '@/store/reducers/money'


export const userLogin = (info) => async (dispatch, getState) => {
  dispatch({ type: types.USER_UPDATE, info })

  if (!info) return

  const { user } = getState()

  if (user.status !== 'unknown') return

  dispatch({ type: types.USER_STATUS, status: 'new' })

  const doc = await database().get()

  if (!doc.exists) {
    database().set({
      version: 3,
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

export const schedulesAssign = (payload) => ({
  type: types.SCHEDULES_ASSIGN,
  payload: payload || {},
})

export const contextAssign = (payload) => ({
  type: types.CONTEXT_ASSIGN,
  payload: payload || {},
})

export const contextEnqueue = (payload) => ({
  type: types.CONTEXT_ENQUEUE,
  payload: payload || {},
})

export const contextNext = () => ({
  type: types.CONTEXT_NEXT,
  payload: {},
})
