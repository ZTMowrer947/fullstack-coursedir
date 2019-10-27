// Imports
import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CourseModel from "../models/Course";

// Prop Types
interface PropTypes {
    course: CourseModel;
}

// Component
const Course: React.FC<PropTypes> = ({ course }) => {
    // Get user from context
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="w-100">
                        {!!user && user.id === course.creator.id && (
                            <span>
                                <Link
                                    className="button"
                                    to={`/courses/${course.id}/update`}
                                >
                                    Update Course
                                </Link>
                                <Link
                                    className="button"
                                    to={`/courses/${course.id}/delete`}
                                >
                                    Delete Course
                                </Link>
                            </span>
                        )}
                        <Link className="button button-secondary" to="/">
                            Return to List
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <Row>
                    <Col xs={8}>
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>
                                By {course.creator.firstName}{" "}
                                {course.creator.lastName}
                            </p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                {/* Display estimated time only if data is present */}
                                {course.estimatedTime && (
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{course.estimatedTime}</h3>
                                    </li>
                                )}

                                {/* Display needed materials only if data is present */}
                                {course.materialsNeeded && (
                                    <li className="course--stats--list--item">
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
};

// Export
export default Course;
