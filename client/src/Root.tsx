// Imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Component
const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

// Export
export default Root;
