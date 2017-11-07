// CLIENT SIDE 
// The client side is very straightforward. All we neew to do is grab the initial state from window.__PRELOADED_STATE__, and pass it to our createStore() function as the initial state.

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'react-redux'
import { Provider } from 'react-redux'
import App from './src/containers/App'
import counterApp from './src/reducers/counterApp'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state 
const store = createStore(counterApp, preloadedState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
  )

// You can set up your build tool of choice (Webpack, Browserify, etc) to compile a bundle file into static/bundle.js

