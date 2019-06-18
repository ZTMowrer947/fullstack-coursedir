// Imports
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import ModifyCourseForm from "../components/ModifyCourseForm";

// Component
class UpdateCourse extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            course: null,
            isLoading: true,
        };
    }

    // Handle form submission
    async handleSubmit(formData) {
        // Get credentials and course ID
        const credentials = this.props.getCredentials();
        const { id } = this.state.course;

        try {
            // Update course
            await axios.put(`http://localhost:5000/api/courses/${id}`, formData, {
                headers: {
                    authorization: `Basic ${credentials}`,
                },
            })
        } catch (error) {
            // If a response is included,
            if (error.response) {
                // Consider the response status
                switch (error.response.status) {
                    // Not Found
                    case 404:
                        // Redirect to not found page
                        this.props.history.push("/notfound");
                        break;


                    // Forbidden
                    case 403:
                        // Redirect to forbidden error page
                        this.props.history.push("/forbidden", { courseId: this.state.course.id });
                        break;

                    // Any other error
                    default:
                        // Rethrow error
                        throw error;
                }
            } else {
                // Otherwise, Rethrow error
                throw error;
            }
        }

        // Redirect to course page
        this.props.history.push(`/courses/${id}`);
    }

    // Run after component has been mounted to the DOM
    componentDidMount() {
        // Get course ID
        const { id } = this.props.match.params;

        // Get course by ID
        axios.get(`http://localhost:5000/api/courses/${id}`)
            // If this succeeds,
            .then(response => {
                // Store course in state
                this.setState({
                    course: response.data,
                    isLoading: false,
                });
            })
            // If an error occurs,
            .catch(error => {
                // If a response is included,
                if (error.response) {
                    // Consider the response status
                    switch (error.response.status) {
                        // Not Found
                        case 404:
                            // Redirect to not found page
                            this.props.history.push("/notfound");
                            break;

                        // Any other error
                        default:
                            // Redirect to unhandled error page
                            this.props.history.push("/error");
                            break;
                    } 
                } else {
                    // Otherwise, redirect to unhandled error page
                    this.props.history.push("/error");
                }
            });
    }

    // Render to DOM
    render() {
        // If we are still loading,
        if (this.state.isLoading)
            // Render a LoadingIndicator
            return <LoadingIndicator size={40} />;
        else if (this.state.course.user.emailAddress !== this.props.user.emailAddress)
            // If the email of the currently logged in user differs from that of the course's creator,
            // Redirect to the forbidden error page
            return <Redirect to={{ pathname: "/forbidden", state: { courseId: this.state.course.id }}} />

        // Otherwise, render update form
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <ModifyCourseForm onSubmit={this.handleSubmit.bind(this)} {...this.state.course} />
            </div>
        )
    }
}

// Prop Types
UpdateCourse.propTypes = {
    getCredentials: PropTypes.func.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default UpdateCourse;
