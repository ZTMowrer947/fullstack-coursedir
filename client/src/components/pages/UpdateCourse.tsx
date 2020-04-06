// Imports
import { FormikActions, FormikErrors } from 'formik';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import ModifyCourseForm from '../forms/ModifyCourseForm';
import Course from '../../models/Course';
import CourseDTO from '../../models/CourseDTO';
import { ServerValidationError } from '../../models/errors';
import CourseApi from '../../services/CourseApi';
import Loading from '../Loading';

// Route params
interface RouteParams {
    id: string;
}

// Page component
const UpdateCourse: React.FC<RouteComponentProps<RouteParams>> = ({
    history,
    match,
}) => {
    // Get user data and credentials from AuthContext
    const context = useContext(AuthContext);
    const credentials = context.getCredentials()!;
    const user = context.user!;

    // Initialize state
    const [course, setCourse] = useState<Course | null>(null);

    // Fetch data on initial course load
    useEffect(() => {
        CourseApi.get(match.params.id).then(course => {
            if (!course)
                return history.push('/courses', {
                    courseNotFound: true,
                });

            setCourse(course);
        });
    }, [match.params.id, history]);

    // Define submit handler
    const handleSubmit = useCallback(
        (
            formData: CourseDTO,
            { setErrors, setSubmitting }: FormikActions<CourseDTO>
        ) => {
            // Update course
            CourseApi.update(credentials, match.params.id, formData)
                .then(() => {
                    // Redirect to course detail page
                    history.push(`/courses/${match.params.id}`);
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
        [credentials, history, match.params.id]
    );

    // Render loading indicator while waiting for course to load
    if (!course) return <Loading />;

    // If user and creator do not match,
    if (user.id !== course.creator.id) {
        // Redirect back to course detail page
        return <Redirect to={`/courses/${course.id}`} />;
    }

    // Otherwise, split out course data
    const { id, creator } = course;
    const courseData: CourseDTO = {
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime ?? '',
        materialsNeeded: course.materialsNeeded ?? '',
    };

    // Render form
    return (
        <div className="course-detail">
            <h1>Update Course</h1>
            <ModifyCourseForm
                author={creator}
                courseId={id}
                courseData={courseData}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

// Export
export default UpdateCourse;
