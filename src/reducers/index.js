import { combineReducers } from 'redux'
import categories from './categories'
import money from './money'
import user from './user'
import schedules from './schedules'
import context from './context'

const rootReducer = combineReducers({
  categories,
  money,
  user,
  schedules,
  context,
})

export default rootReducer
