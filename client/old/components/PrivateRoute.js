// Imports
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { compose } from "redux";
import withImmutablePropsToJS from "with-immutable-props-to-js";

// Component
const PrivateRoute = ({ component, credentials, user, ...rest }) => (
    <Route {...rest} render={routeProps => {
        // Store component to potentially render
        const Component = component;

        // If a user is signed in,
        if (user)
            // Render the provided component
            return <Component {...routeProps} user={user} credentials={credentials} />
        else
            // Otherwise, redirect to the sign-in page
            return <Redirect to={{
                pathname: "/signin",
                state: { prevUrl: rest.location.pathname }
            }} />
    }} />
);

// Redux mapping to React props
const mapStateToProps = state => ({
    credentials: state.getIn(["auth", "credentials"]),
    user: state.getIn(["auth", "user"]),
});

// HOC composition
const enhance = compose(
    connect(mapStateToProps),
    withImmutablePropsToJS,
)

// Export
export default enhance(PrivateRoute);
