import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter'

import './index.css';
import App from './views/app/App'
import registerServiceWorker from './registerServiceWorker'
ReactDOM.render(
    <BrowserRouter basename={ProcessingInstruction.env. PUBLIC_URL}>
        <App />
    </BrowserRouter>,
 document.getElementById('root'));

registerServiceWorker();
