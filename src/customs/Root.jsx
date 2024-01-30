import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import {ReduxRouter} from '../lib/redux-router';
import {UiLogin, UiHome, UiHomeMap, UiProjectList} from "./page";
import NotFound from "../components/NotFound";
import Paths from "../constants/Paths";
import CoreContainer from "../containers/CoreContainer";
import '../lib/easymde-2.18.0/easymde.min.css';
import '../lib/custom-ui/styles.css';
import '../styles.module.scss';
function Root({store, history}) {
    return (
        <Provider store={store}>
            <ReduxRouter history={history}>
                <Routes>
                    <Route path={Paths.LOGIN} element={<UiLogin/>}/>
                    <Route path={Paths.ROOT} element={<UiProjectList/>}/>
                    <Route path={Paths.HOME_MAP} element={<UiHomeMap/>}/>
                    <Route path={Paths.PROJECTS_LIST} element={<UiProjectList />} />
                    <Route path={Paths.BOARDS} element={<CoreContainer />} />
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
