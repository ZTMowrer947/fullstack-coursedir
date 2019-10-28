// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const Forbidden: React.FC = () => {
    return (
        <div className="bounds error">
            <h1>Forbidden</h1>
            <p>You are not allowed to access this resource.</p>
            <br />
            <Link to="/">Return to home page</Link>
        </div>
    );
};

// Export
export default Forbidden;
