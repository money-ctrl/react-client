import './index.css'
import './ui/Icon/font-awesome-library'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker'

const store = createStore(reducer, applyMiddleware(ReduxThunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

window.addEventListener('keyup', (e) => {
  if (e.key !== 'Tab') { return }

  document.documentElement.classList.remove('no-focus-outline')
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
