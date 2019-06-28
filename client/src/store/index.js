// Imports
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import initialState from "./initialState";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

// Browser history setup
export const history = createBrowserHistory();

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Middleware and Enhancer Setup
const middleware = [routerMiddleware(history), sagaMiddleware];
const enhancers = [applyMiddleware(...middleware)];

const composedEnhancer = composeWithDevTools(...enhancers);

// Store
const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancer
);

// Run Sagas
sagaMiddleware.run(rootSaga);

// Export
export default store;
