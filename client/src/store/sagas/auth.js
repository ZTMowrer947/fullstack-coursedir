// Imports
import { push } from "connected-react-router";
import { all, cancel, call, fork, put, spawn, take } from "redux-saga/effects";
import { signInDone, types } from "../actions/auth";
import AuthService from "../../services/AuthService";

// Sagas
function* authenticate(emailAddress, password, prevUrl) {
    try {
        // Sign in user, getting their data and the sign-in credentials
        const [user, credentials] = yield call(AuthService.signIn, emailAddress, password);

        // If successful, dispatch successful SIGN_IN_DONE action
        yield put(signInDone(user, credentials));

        // Redirect to previous URL
        yield put(push(prevUrl));
    } catch (error) {
        // If an error occurs, dispatch failed SIGN_IN_DONE action
        yield put(signInDone(null, null, error));
    }
}

function* signInFlow() {
    // Loop indefinitely
    while (true) {
        // Wait for SIGN_IN_START
        const { payload } = yield take(types.SIGN_IN_START);

        // Perform sign-in operation
        const task = yield fork(authenticate, payload.emailAddress, payload.password, payload.prevUrl);

        // Wait for either SIGN_IN_DONE or SIGN_OUT
        const action = yield take([types.SIGN_IN_DONE, types.SIGN_OUT]);

        // If SIGN_OUT was dispatched, cancel sign-in process if not already finished
        if (action.type === types.SIGN_OUT) yield cancel(task);

        // Clear user and credential data
        yield call(AuthService.signOut);
    }
}

export default function* authSaga() {
    // Define list of sagas to spawn
    const sagas = [signInFlow];

    // Spawn sagas in parallel
    yield all(sagas.map(saga => spawn(saga)));
}
