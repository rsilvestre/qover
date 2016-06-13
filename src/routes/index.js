import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import Application from 'containers/Application/Application'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import FormView from 'views/FormView/FormView'
import QuoteView from 'views/QuoteView/QuoteView'

const requireAuth = (nextState, replaceState) => {
  if (!localStorage.getItem('id_token')) {
    replaceState({nextPathname: nextState.location.pathname + nextState.location.search}, '/')
  }
}

export default (store) => (
  <Route component={Application}>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomeView} />
      <Route path='form' component={FormView} onEnter={requireAuth} />
      <Route path='quote' component={QuoteView} onEnter={requireAuth} />
    </Route>
  </Route>
)
