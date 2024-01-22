import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ReduxRouter } from '../lib/redux-router';

import Paths from '../constants/Paths';
import LoginWrapperContainer from '../containers/LoginWrapperContainer';
import CoreContainer from '../containers/CoreContainer';
import NotFound from './NotFound';

import 'react-datepicker/dist/react-datepicker.css';
import 'photoswipe/dist/photoswipe.css';
import '../lib/easymde-2.18.0/easymde.min.css';
import '../lib/custom-ui/styles.css';
import '../styles.module.scss';
import {PageUiLogin, SkkHome, SkkHomeMap} from "../customs/project/skk";
import {getRouterUrl} from "../customs/router";

function Root({ store, history }) {
  return (
    <Provider store={store}>
      <ReduxRouter history={history}>
        <Routes>
          <Route path={Paths.LOGIN} element={<LoginWrapperContainer />} />
          <Route path={Paths.OIDC_CALLBACK} element={<LoginWrapperContainer />} />
          <Route path={Paths.ROOT} element={<CoreContainer />} />
          <Route path={Paths.PROJECTS} element={<CoreContainer />} />
          <Route path={Paths.BOARDS} element={<CoreContainer />} />
          <Route path={Paths.GANTT} element={<CoreContainer />} />
          <Route path={Paths.CARDS} element={<CoreContainer />} />
          <Route path="*" element={<NotFound />} />
          <Route path={getRouterUrl("page-login")} element={<PageUiLogin/>}/>
          <Route path={getRouterUrl("skk-home")} element={<SkkHome/>}/>
          <Route path={getRouterUrl("skk-home-map")} element={<SkkHomeMap/>}/>
        </Routes>
      </ReduxRouter>
    </Provider>
  );
}

Root.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Root;
