// Imports
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ReactMarkdown from 'react-markdown';
import { IndexLinkContainer } from 'react-router-bootstrap';

import Course from '../models/Course';
import './CourseInfo.scss';

// Prop Types
interface PropTypes {
    course: Course;
}

// Component
const CourseInfo: React.FC<PropTypes> = ({ course }) => (
    <>
        <div className="actions-bar">
            <div className="w-100">
                <IndexLinkContainer to="/">
                    <Button
                        variant="outline-primary"
                        size="lg"
                        className="mr-3"
                    >
                        Return to List
                    </Button>
                </IndexLinkContainer>
            </div>
        </div>
        <div className="course-detail">
            <Row>
                <Col xs={8}>
                    <div className="course-header">
                        <h4 className="course-label">Course</h4>
                        <h3 className="course-title mb-3">{course.title}</h3>
                    </div>
                    <div className="course-description">
                        <ReactMarkdown source={course.description} />
                    </div>
                </Col>
                <Col xs={3}>
                    <div className="course-stats">
                        <ul className="stats-list">
                            {/* Display estimated time only if data is present */}
                            {course.estimatedTime && (
                                <li className="stat-item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                            )}

                            {/* Display needed materials only if data is present */}
                            {course.materialsNeeded && (
                                <li className="stat-item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown
                                        source={course.materialsNeeded}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    </>
);

// Export
export default CourseInfo;
