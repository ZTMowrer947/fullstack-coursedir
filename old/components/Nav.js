// Imports
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import withImmutablePropsToJS from "with-immutable-props-to-js";

// Component
const Nav = props => {
    // If a user is signed in,
    if (props.user) {
        // Render welcome message and signout link
        return (
            <nav>
                <span>
                    Welcome {props.user.firstName} {props.user.lastName}!
                </span>
                <Link to="/signout" className="signout">Sign Out</Link>
            </nav>
        );
    } else {
        // Otherwise, render links to sign-in and sign-up
        return (
            <nav>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to={{ pathname: "/signin", state: { prevUrl: props.location.pathname } }}>Sign In</Link>
            </nav>
        );
    }
};

// Redux mapping to React props
const mapStateToProps = state => ({
    user: state.getIn(["auth", "user"]),
});

// HOC Composition
const enhance = compose(
    // Add React Router props
    withRouter,

    // Connect to Redux
    connect(mapStateToProps),

    // Convert Immutable.js collections to plain JavaScript data
    withImmutablePropsToJS,
);

// Export
export default enhance(Nav);