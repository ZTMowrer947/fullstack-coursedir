// Action Types
export const types = {
    COURSES_FETCH_START: "COURSES_FETCH_START",
    COURSES_FETCH_DONE: "COURSES_FETCH_DONE",
}

// Action Creators
export const coursesFetchStart = () => ({
    type: types.COURSES_FETCH_START,
});

export const coursesFetchDone = (courses, error = undefined) => ({
    type: types.COURSES_FETCH_DONE,
    error: error !== undefined,
    payload: error !== undefined ? error : courses,
});
