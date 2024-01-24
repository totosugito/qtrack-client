import React from 'react';
import ReactDOM from 'react-dom/client';
import history from './history';
import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));

// import store from './store';
// import Root from './components/Root';
// root.render(React.createElement(Root, { store, history }))

import {store} from './customs/store';
import Root from './customs/Root';
root.render(React.createElement(Root, { store, history }))

