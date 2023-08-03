import React from 'react';
import './index.css';
import App from './App';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_API_URL
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
reportWebVitals();