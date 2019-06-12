// Imports
import PropTypes from "prop-types";
import React from "react";

// Components
const BaseError = props => (
    <code>{props.error.message}</code>
);

// Prop Types
BaseError.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default BaseError;
