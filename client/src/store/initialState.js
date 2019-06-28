// Imports
import { fromJS } from "immutable";

// State
const initialState = {
    // auth: {
    //     credentials: null,
    //     user: null,
    //     error: null,
    //     isFetching: false,
    // },
    courses: {
        data: [],
        error: null,
        isFetching: true,
    },
    course: {
        data: null,
        error: null,
        isFetching: true,
    },
};

// Export
export default fromJS(initialState);
