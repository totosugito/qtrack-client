import React from 'react';
import ReactDOM from 'react-dom/client';
import history from './history';
import Root from './components/Root';
import {BrowserRouter} from "react-router-dom";
import './i18n';
import {Provider} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {getRouterUrl} from "./customs/router";
import {PageUiLogin} from "./customs/project/skk";

const root = ReactDOM.createRoot(document.getElementById('root'));
// import store from './store';
// root.render(React.createElement(Root, { store, history }));

import {store} from './customs/store';
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path={getRouterUrl("page-login")} element={<PageUiLogin/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
)
