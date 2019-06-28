// Action Types
export const types = {
    COURSE_FETCH_START: "COURSE_FETCH_START",
    COURSE_FETCH_DONE: "COURSE_FETCH_DONE",
};

// Action Creators
export const courseFetchStart = id => ({
    type: types.COURSE_FETCH_START,
    payload: id,
});

export const courseFetchDone = (course, error = undefined) => ({
    type: types.COURSE_FETCH_DONE,
    error: error !== undefined,
    payload: error !== undefined ? error : course,
});
