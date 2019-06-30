// Imports
import { push } from "connected-react-router";
import { setCookie, removeCookie } from "redux-cookie";
import { all, cancel, cancelled, call, fork, put, spawn, take } from "redux-saga/effects";
import { signInDone, types, resetSignInFlag, createUserDone, signInStart } from "../actions/auth";
import AuthService from "../../services/AuthService";
import ValidationError from "../../ValidationError";

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

function* createUser(userData) {
    // If the password and confirm password don't match,
    if (userData.password !== userData.confirmPassword) {
        // Create error
        const error = new ValidationError("Password and Confirm Password fields must match.", userData);

        // Dispatch failed CREATE_USER
        yield put(createUserDone(error));
    } else {
        try {
            // Attempt to create user
            yield call(AuthService.createUser, userData);
    
            // If successful, dispatch successful CREATE_USER_DONE
            yield put(createUserDone());
    
            // Sign-in the created user
            yield put(signInStart(userData.emailAddress, userData.password, "/"));
        } catch (error) {
            // If an error occurred, dispatch failed CREATE_USER_DONE
            yield put(createUserDone(error));
        }
    }
}

function* signUp() {
    // Declare variable to hold previous task
    let prevTask = null;

    while (true) {
        // Wait for COURSE_FETCH_START and get ID from payload
        const { payload: userData } = yield take(types.CREATE_USER_START);

        // If the previous task has been defined, cancel it if it isn't finished already
        if (prevTask) yield cancel(prevTask);

        // Retrieve course and store task for next run
        prevTask = yield fork(createUser, userData);
    }
}

export default function* authSaga() {
    // Define list of sagas to spawn
    const sagas = [signInFlow, signUp];

    // Spawn sagas in parallel
    yield all(sagas.map(saga => spawn(saga)));
}
