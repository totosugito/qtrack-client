import { configureStore } from '@reduxjs/toolkit';
import reducers from './slice';
import history from "../../history";

import rootSaga from "../../redux/sagas";
import createSagaMiddleware from "redux-saga";
import {createRouterMiddleware} from "../../lib/redux-router";
import {applyMiddleware, compose as reduxCompose} from "redux";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, createRouterMiddleware(history)];
let compose = reduxCompose;

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: () => middlewares
});

const { dispatch } = store;
export { store, dispatch };

sagaMiddleware.run(rootSaga);
