// Imports
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModifyCourseForm from "../forms/ModifyCourseForm";
import CourseService from "../../services/Course.service";
import { RouteComponentProps } from "react-router";
import { AxiosError } from "axios";

// Component
const CreateCourse: React.FC<RouteComponentProps> = ({ history }) => {
    // Get user and credentials from context
    const context = useContext(AuthContext);
    const user = context.user!;
    const credentials = context.getCredentials()!;

    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <ModifyCourseForm
                user={user}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    // Create course
                    CourseService.create(credentials, values)
                        .then(courseId => {
                            // If successful, stop submission
                            setSubmitting(false);

                            // Redirect to new course page
                            history.push(`/courses/${courseId}`);
                        })
                        .catch((error: AxiosError) => {
                            // If an error was thrown,
                            // Stop submission
                            setSubmitting(false);

                            // If a response is attached, and the status code is 400,
                            if (
                                error.response &&
                                error.response.status === 400
                            ) {
                                // If there are validation errors,
                                if (error.response.data.errors) {
                                    // Map validation errors to the format expected by Formik
                                    const validationErrors = error.response.data.errors.reduce(
                                        (acc: object, error: any) => {
                                            // Get "required" message if present, or else get first error message
                                            const errorMessage: string =
                                                error.constraints.isNotEmpty ||
                                                Object.values(
                                                    error.contraints
                                                )[0];

                                            return {
                                                ...acc,
                                                [error.property]: errorMessage
                                                    .replace("title", "Title")
                                                    .replace(
                                                        "description",
                                                        "Description"
                                                    ),
                                            };
                                        },
                                        {}
                                    );

                                    // Set validation errors for form fields
                                    setErrors(validationErrors);
                                }
                            }
                        });
                }}
            />
        </div>
    );
};

// Export
export default CreateCourse;
