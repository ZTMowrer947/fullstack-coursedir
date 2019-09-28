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

        // Reset Sign-in fetching flag
        case types.RESET_SIGN_IN_FLAG:
            // Set fetching flag to false
            return state.merge({
                isFetching: false,
            });
        
        // Starting user creation
        case types.CREATE_USER_START:
            // Clear errors and set fetching flag
            return state.merge({
                isFetching: true,
                error: null,
            });

        // Finishing user creation
        case types.CREATE_USER_DONE: {
            // If the action contains an error,
            if (action.error) {
                // Get error from action
                const { payload: error } = action;

                // Add error to state
                return state.merge({
                    error,
                    isFetching: false,
                });
            } else {
                // Otherwise, unset error
                return state.merge({
                    error: null,
                    isFetching: false,
                });
            }
        }

        default:
            return state;
    }
}