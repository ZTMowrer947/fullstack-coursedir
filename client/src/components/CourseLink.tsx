// Imports
import React from "react";
import { Link } from "react-router-dom";

// Prop Types
interface PropTypes {
    id: string;
    title: string;
}

// Component
const CourseLink: React.FC<PropTypes> = ({ id, title }) => {
    return (
        <div className="grid-33">
            <Link to={`/courses/${id}`} className="course--module course--link">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
            </Link>
        </div>
    );
};

// Export
export default CourseLink;
