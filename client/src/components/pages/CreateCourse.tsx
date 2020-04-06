// Imports
import { FormikActions, FormikErrors } from 'formik';
import React, { useContext, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import ModifyCourseForm from '../forms/ModifyCourseForm';
import CourseDTO from '../../models/CourseDTO';
import { ServerValidationError } from '../../models/errors';
import CourseApi from '../../services/CourseApi';

// Page
const CreateCourse: React.FC<RouteComponentProps> = ({ history }) => {
    // Get user data and credentials from AuthContext
    const context = useContext(AuthContext);
    const user = context.user!;
    const credentials = context.getCredentials()!;

    // Define submit handler
    const handleSubmit = useCallback(
        (
            formData: CourseDTO,
            { setErrors, setSubmitting }: FormikActions<CourseDTO>
        ) => {
            // Create course through API
            CourseApi.create(credentials, formData)
                .then(id => {
                    // Redirect to detail page for new course
                    history.push(`/courses/${id}`);
                })
                .catch(error => {
                    // If there are validation errors,
                    if (error instanceof ServerValidationError) {
                        // Map errors to format expected by formik
                        const formikErrors = error.errors.reduce<
                            FormikErrors<CourseDTO>
                        >((acc, error) => {
                            // Get all constraints for error
                            const constraints = Object.values(
                                error.constraints
                            );

                            // Display isNotEmpty constraint if present, or first constraint otherwise.
                            const constraintToDisplay =
                                constraints.find(constraint =>
                                    constraint.includes('required')
                                ) ?? constraints[0];

                            // Adjust field names for display
                            const finalErrorMessage = constraintToDisplay
                                .replace('title', 'Title')
                                .replace('description', 'Description');

                            // Append error for field to validation error map
                            return {
                                ...acc,
                                [error.property]: finalErrorMessage,
                            };
                        }, {});

                        // Set validation errors for form
                        setErrors(formikErrors);

                        // Stop submission
                        setSubmitting(false);
                    }
                    // Otherwise, rethrow error
                    else throw error;
                });
        },
        [credentials, history]
    );

    // Render page
    return (
        <div className="course-detail">
            <h1>Create Course</h1>
            <ModifyCourseForm author={user} onSubmit={handleSubmit} />
        </div>
    );
};

// Export
export default CreateCourse;
