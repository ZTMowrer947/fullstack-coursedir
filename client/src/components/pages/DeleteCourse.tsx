// Imports
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { RouteComponentProps } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Course from "../../models/Course";
import CourseService from "../../services/Course.service";
import LoadingIndicator from "../LoadingIndicator";
import DeleteCourseForm from "../forms/DeleteCourseForm";
import { AxiosError } from "axios";

// Route params
interface RouteParams {
    readonly id: string;
}

// State type
interface State {
    readonly course?: Course;
}

// Component
class DeleteCourse extends React.PureComponent<RouteComponentProps, State> {
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
            // Otherwise, render form
            return (
                <Row>
                    <Col xs={8} className="bounds">
                        <div>
                            <h4 className="course--label">Delete Course</h4>
                        </div>
                        <div>
                            <DeleteCourseForm
                                course={this.state.course}
                                onSubmit={(values, { setSubmitting }) => {
                                    // Delete course
                                    CourseService.delete(
                                        this.context.getCredentials()!,
                                        this.state.course!.id
                                    )
                                        .then(() => {
                                            // Stop submission
                                            setSubmitting(false);

                                            // Redirect to home page
                                            this.props.history.push("/");
                                        })
                                        .catch((error: AxiosError) => {
                                            // Stop submission
                                            setSubmitting(false);

                                            // If no response is attached, or if its status is not 403 or 404,
                                            if (
                                                !error.response ||
                                                (error.response.status < 403 &&
                                                    error.response.status > 404)
                                            ) {
                                                // Redirect to unhandled error page
                                                this.props.history.push(
                                                    "/error"
                                                );
                                            } else if (
                                                error.response.status === 403
                                            ) {
                                                // If status is 403, redirect to forbidden page
                                                this.props.history.push(
                                                    "/forbidden"
                                                );
                                            } else {
                                                // Otherwise, redirect to not found page
                                                this.props.history.push(
                                                    "/notfound"
                                                );
                                            }
                                        });
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            );
        }
    }
}

// Export
export default DeleteCourse;
