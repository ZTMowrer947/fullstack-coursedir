// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
const Forbidden = props => {
    // Get course Id from location state
    const { courseId } = props.location.state;

    return (
        <div className="bounds error">
            <h1>Forbidden</h1>
            <p>You are not allowed to access this resource.</p>
            <Link to={courseId ? `/courses/${courseId}` : "/"}>Return to {courseId ? "course page" :"home page"}</Link>
        </div>
    )
};

// Export
export default Forbidden;
