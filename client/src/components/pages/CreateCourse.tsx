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

                            // If no response is attached, or if its status is not 400, 403, or 404,
                            if (
                                !error.response ||
                                ![400, 403, 404].includes(error.response.status)
                            ) {
                                // Redirect to unhandled error page
                                history.push("/error");
                            } else if (error.response.status === 403) {
                                // If status is 403, redirect to forbidden page
                                history.push("/forbidden");
                            } else if (error.response.status === 400) {
                                // If status is 400, and there are validation errors,
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
                                } else {
                                    // Otherwise, redirect to unhandled error page
                                    history.push("/error");
                                }
                            } else {
                                // Otherwise, redirect to not found page
                                history.push("/notfound");
                            }
                        });
                }}
            />
        </div>
    );
};

// Export
export default CreateCourse;
