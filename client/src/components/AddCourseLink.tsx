// Imports
import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./AddCourseLink.scss";

// Component
const AddCourseLink: React.FC = () => {
    return (
        <Col xs={12} sm={6} md={4} xl={3}>
            <Link
                to="/courses/create"
                className="course--module course--add--module"
            >
                <h3 className="course--add--title">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 13 13"
                        className="add"
                    >
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                    New Course
                </h3>
            </Link>
        </Col>
    );
};

// Export
export default AddCourseLink;
