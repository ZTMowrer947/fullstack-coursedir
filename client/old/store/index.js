// Imports
import { routerMiddleware } from "connected-react-router/immutable";
import { createBrowserHistory } from "history";
import Cookies from "universal-cookie";
import { applyMiddleware, createStore } from "redux";
import { createCookieMiddleware } from "redux-cookie";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import initialState from "./initialState";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

// Browser history setup
export const history = createBrowserHistory();

// Cookie context setup
const cookieContext = new Cookies();

// Saga and Cookie Middleware
const cookieMiddleware = createCookieMiddleware(cookieContext);
const sagaMiddleware = createSagaMiddleware();

// Middleware and Enhancer Setup
const middleware = [
    routerMiddleware(history),
    cookieMiddleware,
    sagaMiddleware
];
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
