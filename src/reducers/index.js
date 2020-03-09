import { combineReducers } from 'redux'
import categories from './categories'
import money from './money'
import user from './user'

const rootReducer = combineReducers({
  categories,
  money,
  user,
})

export default rootReducer
