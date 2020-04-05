// Import
import { FormikActions } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';

import CourseDTO from '../../models/CourseDTO';
import User from '../../models/User';

import './ModifyCourseForm.scss';

// Prop Types
interface PropTypes {
    onSubmit: (
        values: CourseDTO,
        formikActions: FormikActions<CourseDTO>
    ) => void;
    author: User;
    courseId?: string;
    courseData?: CourseDTO;
}

// Form Component
const ModifyCourseForm: React.FC<PropTypes> = ({
    author,
    courseId,
    courseData,
}) => {
    // Define initial values
    const initialValues: CourseDTO = {
        title: courseData?.title ?? '',
        description: courseData?.description ?? '',
        estimatedTime: courseData?.description ?? '',
        materialsNeeded: courseData?.description ?? '',
    };

    // Render form
    return (
        <Form noValidate method="POST">
            <Row>
                <Col xs={8}>
                    <div className="course-header">
                        <div className="course-label">Course</div>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Course title..."
                                className="input-title course-title-input"
                            />
                        </Form.Group>
                        <p>
                            By {author.firstName} {author.lastName}
                        </p>
                    </div>
                    <div className="course-description">
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Course description..."
                            />
                        </Form.Group>
                    </div>
                </Col>
                <Col xs={3}>
                    <div className="course-stats">
                        <ul className="stats-list">
                            <li className="stat-item">
                                <h4>Estimated Time</h4>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        className="course-time-input"
                                        placeholder="Hours"
                                    />
                                </Form.Group>
                            </li>
                            <li className="stat-item">
                                <h4>Materials Needed</h4>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        placeholder="List materials..."
                                    />
                                </Form.Group>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col xs={12} className="pb-2">
                    <Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="mr-3"
                        >
                            Sign In
                        </Button>
                        <LinkContainer
                            exact
                            to={courseId ? `/courses/${courseId}` : '/'}
                        >
                            <Button variant="outline-primary">Cancel</Button>
                        </LinkContainer>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};

// Export
export default ModifyCourseForm;
