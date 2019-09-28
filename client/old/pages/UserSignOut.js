// Imports
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../store/actions/auth";

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

// Redux mapping to react props
const mapDispatchToProps = dispatch => ({
    signOut: () => {
        dispatch(signOut());
    },
});

// Export
export default connect(
    undefined,
    mapDispatchToProps
)(UserSignOut);
