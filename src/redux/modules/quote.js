/* @flow */
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_QUOTE = 'quote/SAVE_QUOTE'

// ------------------------------------
// Actions
// ------------------------------------
export const saveQuote = (data : object = {entry: {}, product: {}}): Action => ({
  type: SAVE_QUOTE,
  payload: data
})

export const addQuote = (data : object = {entry: {}, product: {}}): Function => {
  return (dispatch: Function): Promise => {
    return new Promise((resolve: Function): void => {
      dispatch(saveQuote(data))
      dispatch(push('/quote'))
      resolve()
    })
  }
}

export const actions = {
  addQuote
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_QUOTE]: (state: object, action: {payload: object}): object => {
    return {...state, ...action.payload}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  entry: {},
  product: {}
}
export default function quoteReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
