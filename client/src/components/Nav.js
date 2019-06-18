// Imports
import React from "react";
import { Link, withRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component
const Nav = props => (
    /* Get auth service from context */
    <AuthContext.Consumer>
        {({ user }) => {
            // If a user is signed in,
            if (user) {
                // Render welcome message and signout link
                return (
                    <nav>
                        <span>
                            Welcome {user.firstName} {user.lastName}!
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
                ) 
            }
        }}
    </AuthContext.Consumer>
);

// Export
export default withRouter(Nav);