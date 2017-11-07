import path from 'path'
import Express from 'express'
import qs from 'qs'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

import counterApp from './reducers'

import App from './containers/App'


const app = Express()
const port = 3000

// we are goind to fill these out in the sections to follow
// function handleRender(req, res)
// function renderFullPage(html, preloadedState)

// inject initial Component HTML and State >> into a template to be rendered on the client side. To pass alog the state, we add a <scrip> tag that will attach

function renderFullPage(html, preloadedState) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8"/>
			<title>Redux Universal Example</title>
		</head>
		<body>
			<div id="root" >${html}</div>
			<script>
				// WARNING: See the folllowing for security issuea around embedding JSON IN HTML:
				// http://redux.js.org/docs/recipes/SserverRendering.html#security-considerations
				window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
			</script>
			<script src="static/bundle.js"></script>
		</body>
		</html>
	`
}


// HANDLING THE REQUEST 
// The first thing that we need to do on every request is create a new REdux store instance. The only purpose of this store instance is to provide the initial state of our application
// When rendering, we will wrapp <App/>, our root component, inside a <Provider> to make the store availabel to all components in the component tree
// The key step in server side rendering is to render the initial HTML of our component before we send it to the client side. to do this, we use ReactDOMServer.renderToString()
// We get the initial state from our REdux store using store.getState().


function handleRender(req, res) {

  // Read the counter from the request, if provided
  const params = qs.parse(req.query)
  const counter = parseInt(params.counter, 10) || 0

	// Compile an initial state
	let preloadedState = { counter }

  // Create a new Redux store instance
  const store = createStore(counterApp, preloadedState)

  // Render the ocmponent to a string
  const html = rendertoString(
    <Provider store={store}>
      <App />
    </Provider>  
  )

  // Grab the initial state from our Redux store
  const finalState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

//Serve static files

app.use('./static', Express.static('static'))

// This is fired every time the server side recives a request
app.use(handleRender)

app.listen(port)

