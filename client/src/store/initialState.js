// Imports
import { fromJS } from "immutable";
import AuthService from "../services/AuthService";

// State
const initialState = {
    auth: {
        credentials: AuthService.getCredentials(),
        user: null,
        error: null,
        isFetching: true,
    },
    courses: {
        data: [],
        error: null,
        isFetching: false,
    },
    course: {
        data: null,
        error: null,
        isFetching: false,
    },
};

// Export
export default fromJS(initialState);
