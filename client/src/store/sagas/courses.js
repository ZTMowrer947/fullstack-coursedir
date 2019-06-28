// Imports
import { call, put, takeLatest } from "redux-saga/effects";
import { types, coursesFetchDone } from "../actions/courses";
import CourseService from "../../services/CourseService";

// Sagas
function* fetchCourses() {
    try {
        // Get course listing
        const courses = yield call(CourseService.getList);

        // If successful, dispatch successful COURSES_FETCH_DONE action
        yield put(coursesFetchDone(courses));
    } catch (error) {
        // If an error occurs, dispatch failed COURSES_FETCH_DONE action
        yield put(coursesFetchDone(null, error));
    }
}

export default function* watchForCoursesFetch() {
    // Fetch courses when COURSES_FETCH_START is dispatched
    yield takeLatest(types.COURSES_FETCH_START, fetchCourses);
}
