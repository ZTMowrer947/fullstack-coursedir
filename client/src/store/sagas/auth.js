// Imports
import { push } from "connected-react-router";
import { all, cancel, cancelled, call, fork, put, spawn, take } from "redux-saga/effects";
import { signInDone, types, resetSignInFlag } from "../actions/auth";
import AuthService from "../../services/AuthService";
import { setCookie, removeCookie } from "redux-cookie";

// Sagas
function* authenticate(emailAddress, password, prevUrl) {
    try {
        // Sign in user, getting their data and the sign-in credentials
        const [user, credentials] = yield call(AuthService.signIn, emailAddress, password);

        // If successful, store encoded credentials in cookie
        yield put(setCookie("sdbc-credentials", credentials, {
            path: "/",
            domain: "localhost",
            maxAge: 2 * (60 ** 2),
        }));

        // Store credentials and user into state
        yield put(signInDone(user, credentials));

        // Redirect to previous URL
        yield put(push(prevUrl));
    } catch (error) {
        // If an error occurs, dispatch failed SIGN_IN_DONE action
        yield put(signInDone(null, null, error));
    } finally {
        // If the task was cancelled
        if (yield cancelled()) {
            // Reset fetching flag
            yield put(resetSignInFlag());
        }
    }
}

function* signInFlow() {
    // Loop indefinitely
    while (true) {
        // Wait for SIGN_IN_START
        const { payload } = yield take(types.SIGN_IN_START);

        // Perform sign-in operation
        const task = yield fork(authenticate, payload.emailAddress, payload.password, payload.prevUrl);

        // Wait for either SIGN_OUT or failed SIGN_IN_DONE
        const action = yield take([
            types.SIGN_OUT,
            action => action.type === types.SIGN_IN_DONE && action.error,
        ]);

        // If SIGN_OUT was dispatched, cancel sign-in process if not already finished
        if (action.type === types.SIGN_OUT) yield cancel(task);

        // Clear credential cookie data
        yield put(removeCookie("sdbc-credentials", {
            path: "/",
            domain: "localhost",
            maxAge: 2 * (60 ** 2),
        }));
    }
}

export default function* authSaga() {
    // Define list of sagas to spawn
    const sagas = [signInFlow];

    // Spawn sagas in parallel
    yield all(sagas.map(saga => spawn(saga)));
}
