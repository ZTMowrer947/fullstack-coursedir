// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const UnhandledError = () => {
    return (
        <div className="bounds error">
            <h1>Error</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <br />
            <Link to="/">Return to home page</Link>
        </div>
    )
};

// Export
export default UnhandledError;
