// Action Types
export const types = {
    SIGN_IN_START: "SIGN_IN_START",
    SIGN_IN_DONE: "SIGN_IN_DONE",
    SIGN_OUT: "SIGN_OUT",
};

// Action Creators
export const signInStart = (emailAddress, password) => ({
    type: types.SIGN_IN_START,
    payload: {
        emailAddress,
        password,
    },
});

export const signInDone = (user, credentials, error = undefined) => ({
    type: types.SIGN_IN_DONE,
    error: error !== undefined,
    payload: error !== undefined ? error : {
        user,
        credentials,
    },
});

export const signOut = () => ({ type: types.SIGN_OUT });
