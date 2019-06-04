// Imports
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

// Component
const UserSignOut = props => {
    // Sign out user
    props.signOut();

    // Redirect to home page
    return <Redirect to="/" />;
};

// Prop Types
UserSignOut.propTypes = {
    signOut: PropTypes.func.isRequired,
};

// Export
export default UserSignOut;
