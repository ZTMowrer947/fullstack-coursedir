// Imports
import { all, spawn } from "redux-saga/effects";
import courseSaga from "./course";
import coursesSaga from "./courses";

// Root saga
export default function* rootSaga() {
    yield all([
        spawn(courseSaga),
        spawn(coursesSaga),
    ]);
};
