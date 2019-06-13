// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const NotFound = () => {
    return (
        <div className="bounds error">
            <h1>Not Found</h1>
            <p>Sorry, the requested resource could not be found.</p>
            <br />
            <Link to="/">Return to home page</Link>
        </div>
    )
};

// Export
export default NotFound;
