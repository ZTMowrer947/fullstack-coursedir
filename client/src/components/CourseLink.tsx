// Imports
import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import Course from '../models/Course';

// Prop Types
interface PropTypes {
    course: Course;
}

// Component
const CourseLink: React.FC<PropTypes> = ({ course }) => (
    <Col xs={12} sm={6} lg={4} xl={3}>
        <Link
            to={`/courses/${course.id}`}
            className="course-module course-link"
            data-testid="course-link"
        >
            <h4 className="course-label">Course</h4>
            <h3 className="course-title" data-testid="course-title">
                {course.title}
            </h3>
        </Link>
    </Col>
);

// Export
export default CourseLink;
