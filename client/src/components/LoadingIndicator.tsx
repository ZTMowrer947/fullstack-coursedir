// Imports
import React from "react";
import Spinner from "react-bootstrap/Spinner";

// Component
const LoadingIndicator: React.FC = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="border" />
        </div>
    );
};

// Export
export default LoadingIndicator;
