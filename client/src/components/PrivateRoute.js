// Imports
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component
const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={routeProps => (
        // Get user from context
        <AuthContext.Consumer>
            {({ getCredentials, user }) => {
                // Store component to potentially render
                const Component = component;

                // If a user is signed in,
                if (user)
                    // Render the provided component
                    return <Component {...routeProps} user={user} getCredentials={getCredentials} />
                else
                    // Otherwise, redirect to the sign-in page
                    return <Redirect to={{
                        pathname: "/signin",
                        state: { prevUrl: rest.location.pathname }
                    }} />
            }}
        </AuthContext.Consumer>
    )} />
);

// Export
export default PrivateRoute;
