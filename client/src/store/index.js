// Imports
import initialState from "./initialState";
import rootReducer from "./reducers";
import { createStore } from "redux";

// Store
const store = createStore(rootReducer, initialState, undefined);

// Export
export default store;
