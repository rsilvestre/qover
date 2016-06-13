/* @flow */
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_QUOTE = 'quote/ADD_QUOTE'

// ------------------------------------
// Actions
// ------------------------------------
export function addQuote (value: object = {}): Function {
  return (dispatch: Function): Promise => {
    dispatch({
      type: ADD_QUOTE,
      payload: value
    })
    return dispatch(push('/quote'))
  }
}

export const actions = {
  addQuote
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_QUOTE]: (state: object, action: {payload: object}): object => {
    return {...state, ...action.payload}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function quoteReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
