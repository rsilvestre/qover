import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './modules/authenticate'
import quote from './modules/quote'

export default combineReducers({
  router,
  auth,
  form: formReducer,
  quote
})
