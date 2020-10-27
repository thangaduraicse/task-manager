import '@babel/polyfill';// Ie8, ie9 - includes (Array, String), fetch, Promise
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/Base/App';
import './scss/main';

ReactDOM.render(<App />, document.getElementById('root'));
