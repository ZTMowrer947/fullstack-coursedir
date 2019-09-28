// Imports
import { cancel, call, fork, put, take } from "redux-saga/effects";
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
    // Declare variable to hold previous task
    let prevTask = null;

    while (true) {
        // Wait for COURSE_FETCH_START and get ID from payload
        const { payload: id } = yield take(types.COURSE_FETCH_START);

        // If the previous task has been defined, cancel it if it isn't finished already
        if (prevTask) yield cancel(prevTask);

        // Retrieve course and store task for next run
        prevTask = yield fork(fetchCourse, id);
    }
}
