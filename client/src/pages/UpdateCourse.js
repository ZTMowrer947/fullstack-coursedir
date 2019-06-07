// Imports
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
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
    handleSubmit(formData) {
        // TODO: Update course
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
            });
        // TODO: Handle errors
    }

    // Render to DOM
    render() {
        // If we are still loading,
        if (this.state.isLoading)
            // Render a LoadingIndicator
            return <LoadingIndicator size={40} />;

        // Otherwise, render update form
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <ModifyCourseForm user={this.props.user} onSubmit={this.handleSubmit.bind(this)} {...this.state.course} />
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
