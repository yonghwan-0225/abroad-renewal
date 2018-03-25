import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { app, mode, exc, user } from './reducer'
import { App } from './components';
import './global.css'

const store = createStore(combineReducers({ app, mode, exc, user }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-container')
)
