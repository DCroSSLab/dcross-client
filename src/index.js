/**
*
* Project Name: 	DCroSS
* Author List: 		Faraaz Biyabani
* Filename: 		index.js
* Description:      App entrypoint
*
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Map from "./features/map/Map";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Map />
    </Provider>
  </React.StrictMode>,
  document.getElementById('map')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
