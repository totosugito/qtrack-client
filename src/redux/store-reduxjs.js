import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import history from "../history";

import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import {createRouterMiddleware} from "../lib/redux-router";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, createRouterMiddleware(history)];

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: () => middlewares
});

const { dispatch } = store;
export { store, dispatch };

sagaMiddleware.run(rootSaga);
