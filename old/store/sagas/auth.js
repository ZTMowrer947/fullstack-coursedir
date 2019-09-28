// Imports
import { push } from "connected-react-router";
import { setCookie, removeCookie } from "redux-cookie";
import { SubmissionError } from "redux-form";
import { all, cancel, cancelled, call, fork, put, spawn, take, takeLatest } from "redux-saga/effects";
import { signInDone, types, resetSignInFlag, signInStart, signUp } from "../actions/auth";
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

function* createUser(action) {
    // Get user data from action payload
    const { payload: userData } = action;

    // If the password and confirm password don't match,
    if (userData.get("password") !== userData.get("confirmPassword")) {
        // Create error
        const error = new SubmissionError({
            _error: "Password and Confirm Password fields must match.",
        }, userData);

        // Dispatch submission failure
        yield put(signUp.failure(error));
    } else {
        try {
            // Attempt to create user
            yield call(AuthService.createUser, userData);
    
            // If successful, dispatch submission success
            yield put(signUp.success());
    
            // Sign-in the created user
            yield put(signInStart(userData.get("emailAddress"), userData.get("password"), "/"));
        } catch (error) {
            // If a error is a validation error
            if (error instanceof ValidationError) {
                // Get validation error listing
                const validationErrors = error.message.split(",")
                    .map(error => error.substring(error.indexOf(": ") + 2))
                    .reduce((validationErrors, error) => {
                        // Declare variable to hold error key
                        let key = error.split(" ", 1)[0];

                        // If the error is not relating to the password,
                        if (!error.startsWith("password")) {
                            // Get second word in message
                            let secondWord = error.split(" ")[1]

                            // Capitalize word
                            secondWord = secondWord[0].toUpperCase() + secondWord.slice(1);
                            
                            // Add to key name
                            key += secondWord;
                        }

                        // Add key-value pair for validation error
                        validationErrors[key] = error;

                        return validationErrors;
                    }, {});

                // Create submission error
                const submitError = new SubmissionError(validationErrors);
                
                // Dispatch submission failure
                yield put(signUp.failure(submitError));
            } else {
                // Otherwise, create generic submission error
                const submitError = new SubmissionError({
                    _error: "An error occurred during user creation.",
                });

                // Dispatch submission failure
                yield put(signUp.failure(submitError));
            }
        }
    }
}

function* signUpFlow() {
    // Watch for SIGN_UP_REQUEST
    yield takeLatest(signUp.REQUEST, createUser);
}

export default function* authSaga() {
    // Define list of sagas to spawn
    const sagas = [signInFlow, signUpFlow];

    // Spawn sagas in parallel
    yield all(sagas.map(saga => spawn(saga)));
}
