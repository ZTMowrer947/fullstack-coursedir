// Imports
import { call, put, take } from "redux-saga/effects";
import { types, courseFetchDone } from "../actions/course";
import CourseService from "../../services/CourseService";

// Sagas
function* fetchCourse(id) {
    try {
        // Get course
        const course = yield call(CourseService.getById, id);

        // If successful, dispatch successful COURSE_FETCH_DONE action
        yield put(courseFetchDone(course));
    } catch (error) {
        // If an error occurs, dispatch failed COURSE_FETCH_DONE action
        yield put(courseFetchDone(null, error));
    }
}

export default function* courseFetchFlow() {
    // Wait for COURSE_FETCH_START and get ID from payload
    const { payload: id } = yield take(types.COURSE_FETCH_START);

    // Retrieve course
    yield call(fetchCourse, id);
}
