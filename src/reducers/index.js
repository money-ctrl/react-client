import { combineReducers } from 'redux'
import money from './money'
import user from './user'

const store = combineReducers({
  money,
  user,
})

export default store
