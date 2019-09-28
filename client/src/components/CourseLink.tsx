// Imports
import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

// Prop Types
interface PropTypes {
    id: string;
    title: string;
}

// Component
const CourseLink: React.FC<PropTypes> = ({ id, title }) => {
    return (
        <Col xs={12} sm={6} md={4} xl={3}>
            <Link to={`/courses/${id}`} className="course--module course--link">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
            </Link>
        </Col>
    );
};

// Export
export default CourseLink;
