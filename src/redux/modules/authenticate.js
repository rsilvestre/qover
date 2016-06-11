/* @flow */
import 'whatwg-fetch'
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
const requestLogin = (creds: object): Action => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

const receiveLogin = (user: object): Action => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.jwt,
    userInfo: user.user
  }
}

const loginError = (message: string): Action => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

const requestLogout = (): Action => {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

const receiveLogout = (): Action => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const loginUser = (creds: Object): Function => {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `identifier=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:1337/api/auth/local', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.jwt)
          localStorage.setItem('user_info', JSON.stringify(user.user))
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log('Error: ', err))
  }
}

// Logs the user out
export const logoutUser = (): Function => {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('user_info')
    dispatch(receiveLogout())
    dispatch(push('/'))
  }
}

export const actions = {
  loginUser,
  logoutUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state: object, action: object): object => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      user: action.creds,
      userInfo: null
    })
  },
  [LOGIN_SUCCESS]: (state: object, action: object): object => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: '',
      userInfo: action.userInfo
    })
  },
  [LOGIN_FAILURE]: (state: object, action: string): object => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message,
      userInfo: null
    })
  },
  [LOGOUT_SUCCESS]: (state: object): object => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false,
      userInfo: null
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  userInfo: JSON.parse(localStorage.getItem('user_info')) || null,
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('id_token')
}

export default function authenticateReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

