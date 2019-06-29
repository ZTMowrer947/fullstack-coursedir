// Imports
import { all, spawn } from "redux-saga/effects";
import authSaga from "./auth";
import courseSaga from "./course";
import coursesSaga from "./courses";

// Root saga
export default function* rootSaga() {
    // List of sagas to spawn
    const sagas = [authSaga, courseSaga, coursesSaga];

    // Spawn each saga in parallel
    yield all(sagas.map(saga => spawn(saga)));
};
