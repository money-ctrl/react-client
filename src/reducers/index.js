import { combineReducers } from 'redux'
import categories from './categories'
import money from './money'
import user from './user'
import schedules from './schedules'

const rootReducer = combineReducers({
  categories,
  money,
  user,
  schedules,
})

export default rootReducer
