// Imports
import { fromJS } from "immutable";
import { types } from "../actions/course";
import initialState from "../initialState";

// Reducer
export default function course(state = initialState.get("course"), action) {
    // Consider action type
    switch (action.type) {
        // Router navigation
        case "@@router/LOCATION_CHANGE":
            // Get pathname
            const { pathname } = action.payload.location;
            
            // If we are on the course detail page, don't change the state
            if (/^\/courses\/\d+/.test(pathname)) return state;

            // Otherwise, clear the course data
            return state.set("data", null);

        // Starting course list fetch
        case types.COURSE_FETCH_START:
            // Clear error and set fetching flag
            return state.merge({
                error: null,
                isFetching: true,
            });

        // Finished course list fetch
        case types.COURSE_FETCH_DONE:
            // If the action contains an error,
            if (action.error) {
                // Add it to state
                return state.merge({
                    error: action.payload,
                    isFetching: false,
                });
            } else {
                // Otherwise, add course listing to state
                return state.merge({
                    data: fromJS(action.payload),
                    isFetching: false,
                });
            }

        // Unrecognized action type
        default:
            // Return state as-is
            return state;
    }
}