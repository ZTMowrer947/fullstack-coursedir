// Imports
import { Formik, FormikErrors } from 'formik';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import Course from '../../models/Course';
import { NotFoundError } from '../../models/errors';
import CourseApi from '../../services/CourseApi';
import Loading from '../Loading';

// Route params
interface RouteParams {
    id: string;
}

// Form values
interface DeleteCourseFormValues {
    title: string;
}

// Page component
const DeleteCourse: React.FC<RouteComponentProps<RouteParams>> = ({
    history,
    match,
}) => {
    // Get user data and credentials from AuthContext
    const context = useContext(AuthContext);
    const credentials = context.getCredentials()!;
    const user = context.user!;

    // Initialize state
    const [course, setCourse] = useState<Course | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Fetch data on initial course load
    useEffect(() => {
        CourseApi.get(match.params.id).then(course => {
            // If course was not found, redirect to book listing
            if (!course)
                return history.push('/courses', {
                    flashError: new NotFoundError(),
                });

            setCourse(course);
        });
    }, [match.params.id, history]);

    // Define submission and validation handlers
    const handleSubmit = useCallback(() => {
        // Delete course
        CourseApi.delete(credentials, match.params.id)
            .then(() => {
                // Redirect to home pahe
                history.push('/');
            })
            .catch(error => {
                // If an error was thrown, attach it to state to throw later
                setError(error);
            });
    }, [credentials, history, match.params.id]);

    const validate = useCallback(
        (formData: DeleteCourseFormValues) => {
            // Define object to hold errors
            const errors: FormikErrors<DeleteCourseFormValues> = {};

            // If title from form does not match course title,
            if (formData.title !== course!.title) {
                // Attach error to title field
                errors.title = `Title field does not match course title.`;
            }

            // Return validation errors
            return errors;
        },
        [course]
    );

    // If an error has occurred, throw it
    if (error) throw error;

    // Render loading indicator while waiting for course to load
    if (!course) return <Loading />;

    // If user and creator do not match,
    if (user.id !== course.userId) {
        // Redirect back to course detail page
        return <Redirect to={`/courses/${course.id}`} />;
    }

    // Otherwise, define initial form values
    const initialValues: DeleteCourseFormValues = {
        title: '',
    };

    return (
        <Row>
            <Col xs={2} md={3} xl={4} />
            <Col xs={8} md={6} xl={4}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validate={validate}
                >
                    {({
                        values,
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form noValidate method="POST" onSubmit={handleSubmit}>
                            <div>
                                <h1 className="display-4">WARNING!</h1>
                                <p>
                                    This will <em>permanently</em> delete the
                                    course "{course.title}". Once it is deleted,
                                    it <strong>CANNOT</strong> be recovered.
                                </p>
                                <p>
                                    If you still wish to delete the course,
                                    please type the title of the course to
                                    confirm the deletion.
                                </p>
                            </div>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="input-title course-title-input"
                                    placeholder="Confirm title..."
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="w-100">
                                <Button
                                    variant="danger"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mr-3"
                                >
                                    DELETE Course
                                </Button>
                                <LinkContainer
                                    exact
                                    to={`/courses/${course.id}`}
                                >
                                    <Button variant="outline-primary">
                                        Cancel
                                    </Button>
                                </LinkContainer>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Col>
            <Col xs={2} md={3} xl={4} />
        </Row>
    );
};

// Export
export default DeleteCourse;
