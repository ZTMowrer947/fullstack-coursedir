// Imports
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import ModifyCourseForm from "../components/ModifyCourseForm";

// Component
class CreateCourse extends React.Component {
    handleSubmit(formData) {
        // Get authorization credentials
        const credentials = this.props.getCredentials();

        // Create course using form data
        axios.post("http://localhost:5000/api/courses", formData, {
            // Set request headers
            headers: {
                // Attach authorization credentials
                authorization: `Basic ${credentials}`,
            },
        })
            .then(response => {
                // Get location of new course
                const { location } = response.headers;

                // Trim /api prefix from location
                const frontendLocation = location.replace("/api", "");

                // Redirect to newly created course
                this.props.history.push(frontendLocation);
            })
    }

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <ModifyCourseForm user={this.props.user} onSubmit={this.handleSubmit.bind(this)} />
            </div>
        );
    }
}

// Prop Types
CreateCourse.propTypes = {
    getCredentials: PropTypes.func.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default CreateCourse;
