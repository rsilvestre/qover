import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import auth from './modules/authenticate'

export default combineReducers({
  counter,
  router,
  auth
})
