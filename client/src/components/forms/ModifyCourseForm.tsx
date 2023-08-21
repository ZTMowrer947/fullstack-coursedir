// Import
import { Formik, FormikActions } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import * as Yup from 'yup';

import CourseDTO from '../../models/CourseDTO';
import User from '../../models/User';

import './ModifyCourseForm.scss';

// Prop Types
interface PropTypes {
    onSubmit: (
        values: CourseDTO,
        formikActions: FormikActions<CourseDTO>
    ) => void;
    author: Pick<User, 'firstName' | 'lastName'>;
    courseId?: string;
    courseData?: CourseDTO;
}

// Validation Schema
const ModifyCourseSchema = Yup.object().shape({
    title: Yup.string().required('Title is a required field.'),
    description: Yup.string().required('Description is a required field.'),
});

// Form Component
const ModifyCourseForm: React.FC<PropTypes> = ({
    author,
    courseId,
    courseData,
    onSubmit,
}) => {
    // Define initial values
    const initialValues: CourseDTO = {
        title: courseData?.title ?? '',
        description: courseData?.description ?? '',
        estimatedTime: courseData?.estimatedTime ?? '',
        materialsNeeded: courseData?.materialsNeeded ?? '',
    };

    // Render form
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ModifyCourseSchema}
            validateOnBlur={false}
        >
            {({
                errors,
                isSubmitting,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <Form noValidate method="POST" onSubmit={handleSubmit}>
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
                                        value={values.title}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
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
                                        value={values.description}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
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
                                                value={values.estimatedTime}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!errors.estimatedTime
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.estimatedTime}
                                            </Form.Control.Feedback>
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
                                                value={values.materialsNeeded}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={
                                                    !!errors.materialsNeeded
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.materialsNeeded}
                                            </Form.Control.Feedback>
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
                                    disabled={isSubmitting}
                                >
                                    {courseId ? 'Update' : 'Create'} Course
                                </Button>
                                <LinkContainer
                                    exact
                                    to={courseId ? `/courses/${courseId}` : '/'}
                                >
                                    <Button variant="outline-primary">
                                        Cancel
                                    </Button>
                                </LinkContainer>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default ModifyCourseForm;
