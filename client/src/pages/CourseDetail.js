// Imports
import axios from "axios";
import React from "react";
import Course from "../components/Course";
import LoadingIndicator from "../components/LoadingIndicator";
import AuthContext from "../context/AuthContext";

// Components
class CourseDetail extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            course: null,
            isLoading: true,
            error: null,
        };
    }

    // Run after component has been mounted to the DOM
    componentDidMount() {
        // Get ID from route params
        const id = this.props.match.params.id;

        // Get course data from API
        axios
            .get(`http://localhost:5000/api/courses/${id}`)
            // If this is successful,
            .then(response => {
                // Update state with course data
                this.setState({
                    isLoading: false,
                    course: response.data,
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
                            this.props.history.push("/notfound", { error: error.response.data });
                            break;

                        // Any other error
                        default:
                            // Redirect to unhandled error page
                            this.props.history.push("/error");
                            break;
                    }
                };
            });
    }

    // Render to DOM
    render() {
        // If the loading process has finished
        if (!this.state.isLoading) {
            // Render course data
            return (
                <Course {...this.state.course} authUser={this.context.user} />
            );
        }

        // Otherwise, render loading indicator
        return <LoadingIndicator size={40} />;
    }
}

// Content
CourseDetail.contextType = AuthContext;

// Export
export default CourseDetail;
