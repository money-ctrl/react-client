import { combineReducers } from 'redux'
import money from './money'
import user from './user'

const rootReducer = combineReducers({
  money,
  user,
})

export default rootReducer
