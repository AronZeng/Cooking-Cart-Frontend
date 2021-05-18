import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Col, Row } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
