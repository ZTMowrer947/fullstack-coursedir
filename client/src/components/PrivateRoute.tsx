// Imports
import React, { useContext } from "react";
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Prop Types
interface PropTypes extends RouteProps {
    component: React.ComponentType<RouteComponentProps>;
}

// Component
const PrivateRoute: React.FC<PropTypes> = ({
    component: Component,
    ...rest
}) => {
    // Get user data and loading state from context
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                // If user data is not present,
                if (!user) {
                    // Determine URL to redirect to after signin
                    const prevUrl = rest.location
                        ? rest.location.pathname
                        : "/";

                    // Return redirect to signin page
                    return (
                        <Redirect
                            to={{ pathname: "/signin", state: { prevUrl } }}
                        />
                    );
                }

                // Otherwise, render component
                return <Component {...props} />;
            }}
        />
    );
};

// Export
export default PrivateRoute;
