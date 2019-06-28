// State
const initialState = {
    auth: {
        credentials: null,
        user: null,
        error: null,
        isFetching: false,
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
export default initialState;
