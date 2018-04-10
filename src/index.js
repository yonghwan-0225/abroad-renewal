import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { board, exc, user } from './reducer'
import { App, NotAllowedBrowser } from './components';
import './global.css'

if (navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {  // only allow chrome
  ReactDOM.render(
    <NotAllowedBrowser />,
    document.getElementById('react-container')
  )
} else {
  const store = createStore(combineReducers({ board, exc, user }))
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-container')
  )
}
