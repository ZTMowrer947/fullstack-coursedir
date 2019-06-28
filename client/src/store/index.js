// Imports
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import initialState from "./initialState";
import rootReducer from "./reducers";
import courseSaga from "./sagas/courses";

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Middleware and Enhancer Setup
const middleware = [sagaMiddleware];
const enhancers = [applyMiddleware(...middleware)];

const composedEnhancer = composeWithDevTools(...enhancers);

// Store
const store = createStore(
    rootReducer,
    initialState,
    composedEnhancer
);

// Run Sagas
sagaMiddleware.run(courseSaga);

// Export
export default store;
