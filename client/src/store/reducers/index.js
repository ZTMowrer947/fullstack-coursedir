// Imports
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form/immutable";
import { combineReducers } from "redux-immutable";
import auth from "./auth";
import course from "./course";
import courses from "./courses";

// Root reducer creator
const createRootReducer = history => combineReducers({
    auth,
    course,
    courses,
    form: formReducer,
    router: connectRouter(history),
});

// Export
export default createRootReducer;
