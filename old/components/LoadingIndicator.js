// Imports
import PropTypes from "prop-types";
import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./LoadingIndicator.css";

// Component
const LoadingIndicator = props => (
    <div className="loading">
        <CircularProgress size={props.size} />
    </div>
);

// Prop Types
LoadingIndicator.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]).isRequired,
}

LoadingIndicator.defaultProps = {
    size: 80,
}

// Export
export default LoadingIndicator;
