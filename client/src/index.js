import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
  <Router>
 <App />
    </Router>
  </Provider>,
  
  document.getElementById('root'),
);