// Imports
import { fromJS } from "immutable";
import { types } from "../actions/auth";
import initialState from "../initialState";

// Reducer
export default function auth(state = initialState.get("auth"), action) {
    // Consider action type
    switch (action.type) {
        // Starting sign-in process
        case types.SIGN_IN_START:
            // Clear error and set fetching flag
            return state.merge({
                error: null,
                isFetching: true,
            });

        // Finished sign-in process
        case types.SIGN_IN_DONE:
            // If the action contains an error,
            if (action.error) {
                // Add it to state
                return state.merge({
                    error: action.payload,
                    isFetching: false,
                });
            } else {
                // Otherwise, get payload data
                const immutablePayload = fromJS(action.payload);

                // Add authentication data to state
                return state.merge({
                    user: immutablePayload.get("user"),
                    credentials: immutablePayload.get("credentials"),
                    isFetching: false,
                });
            }

        // Sign-out
        case types.SIGN_OUT:
            // Clear authentication data
            return state.merge({
                user: null,
                credentials: null,
            });

        default:
            return state;
    }
}