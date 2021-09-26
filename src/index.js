import React from 'react';
import {render, hydrate} from 'react-dom';
import './index.css';
import App from './App';

//import registerServiceWorker from 'react-service-worker';

const rootElement = document.getElementById("root");

if(rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>, 
    rootElement);
} else {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement);
}

/* registerServiceWorker().register(); */