import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import allReducers, { reducers } from './reducers';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";
import { composeWithDevTools } from "redux-devtools-extension";
//import { contactReducer } from "./reducers/contactReducer";

ReactDOM.render(
  <Provider store={store}>
  <Router>
 <App />
    </Router>
  </Provider>,
  
  document.getElementById('root'),
);