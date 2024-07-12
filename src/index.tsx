import React from 'react';
import ReactDOM from 'react-dom';
import './common.css';
import { App } from './components/App/App';
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
