// Imports
import React from "react";
import AuthContext from "../../context/AuthContext";
import ModifyCourseForm from "../forms/ModifyCourseForm";
import CourseService from "../../services/Course.service";
import { RouteComponentProps } from "react-router";
import { AxiosError } from "axios";
import Course from "../../models/Course";
import LoadingIndicator from "../LoadingIndicator";

// Route params
interface RouteParams {
    readonly id: string;
}

// State type
interface State {
    readonly course?: Course;
}

// Component
class UpdateCourse extends React.PureComponent<RouteComponentProps, State> {
    // Context
    static contextType = AuthContext;
    public context!: React.ContextType<typeof AuthContext>;

    // State initialization
    public state: State = {
        course: undefined,
    };

    public componentDidMount() {
        // Get course id
        const { id } = this.props.match.params as RouteParams;

        // Get course data
        CourseService.getById(id).then(course => {
            // Attach course to state
            this.setState({
                course,
            });
        });
    }

    public render() {
        // If the course data is not present,
        if (!this.state.course) {
            // Render a loading indicator
            return <LoadingIndicator />;
        } else {
            // Otherwise, extract course data from state
            const {
                creator,
                id,
                title,
                description,
                estimatedTime,
                materialsNeeded,
            } = this.state.course;

            // Render form
            return (
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <ModifyCourseForm
                        user={creator}
                        courseId={id}
                        title={title}
                        description={description}
                        estimatedTime={estimatedTime || undefined}
                        materialsNeeded={materialsNeeded || undefined}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            // Get credentials
                            const credentials = this.context.getCredentials()!;

                            // Create course
                            CourseService.update(credentials, id, values)
                                .then(() => {
                                    // If successful, stop submission
                                    setSubmitting(false);

                                    // Redirect to updated course page
                                    this.props.history.push(`/courses/${id}`);
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
                                                        error.constraints
                                                            .isNotEmpty ||
                                                        Object.values(
                                                            error.contraints
                                                        )[0];

                                                    return {
                                                        ...acc,
                                                        [error.property]: errorMessage
                                                            .replace(
                                                                "title",
                                                                "Title"
                                                            )
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
        }
    }
}

// Export
export default UpdateCourse;
