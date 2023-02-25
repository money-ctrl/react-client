import './index.css'
import './ui/Icon/font-awesome-library'
import * as serviceWorker from './serviceWorker'

import React from 'react'
import { render } from 'react-dom'
import App from './App'

import { store } from './store'
import { Provider } from 'react-redux'

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
