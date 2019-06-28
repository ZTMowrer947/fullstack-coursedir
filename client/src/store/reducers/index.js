// Imports
import course from "./course";
import courses from "./courses";
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux-immutable";

// Root reducer creator
const createRootReducer = history => combineReducers({
    course,
    courses,
    router: connectRouter(history),
});

// Export
export default createRootReducer;
