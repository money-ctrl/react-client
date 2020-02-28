import * as types from '../constants'
import {
  firebase,
} from '../services/firebase'

export const userLogin = (info) => ({ type: types.USER_UPDATE, info })

export const userLogout = () => async () => {
  await firebase.auth().signOut()
    .catch(console.error) // eslint-disable-line no-console
}
