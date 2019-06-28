// Imports
import course from "./course";
import courses from "./courses";
import { combineReducers } from "redux";

// Root reducer
const rootReducer = combineReducers({
    course,
    courses,
});

// Export
export default rootReducer;
