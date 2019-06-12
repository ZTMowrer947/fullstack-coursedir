// Imports
import React from "react";
import { Link } from "react-router-dom";
import BaseError from "../components/BaseError";

// Component
const NotFound = props => {
    // Get error from location state
    const { error } = props.location.state;

    return (
        <div className="bounds error">
            <h1>Not Found</h1>
            <p>Sorry, the requested resource could not be found.</p>
            <BaseError error={error} />
            <br />
            <Link to="/">Return to home page</Link>
        </div>
    )
};

// Export
export default NotFound;
