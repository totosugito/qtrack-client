import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {ReduxRouter} from '../lib/redux-router';
import {PageUiLogin} from "./project/skk";
import {getRouterUrl} from "./router";
import NotFound from "../components/NotFound";
import CoreContainer from "./project/skk/page/container/CoreContainer";
import Paths from "../constants/Paths";

function Root({store, history}) {
    return (
        <Provider store={store}>
            <ReduxRouter history={history}>
                <Routes>
                    {/*<Route path={getRouterUrl("page-login")} element={<PageUiLogin/>}/>*/}
                    <Route path={getRouterUrl("page-login")} element={<PageUiLogin/>}/>
                    <Route path={getRouterUrl("root")} element={<CoreContainer/>}/>
                    {/*<Route path={Paths.ROOT} element={<CoreContainer/>}/>*/}
                    {/*<Route path="*" element={<NotFound />} />*/}
                </Routes>
            </ReduxRouter>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Root;
