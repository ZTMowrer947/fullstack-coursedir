// Imports
import initialState from "./initialState";
import rootReducer from "./reducers";
import { createStore } from "redux";

// Store
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Export
export default store;
