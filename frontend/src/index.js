import React from 'react';
import { createRoot } from 'react-dom/client';
import "bulma/css/bulma.css";
import axios from 'axios';
import App from './App';
axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);