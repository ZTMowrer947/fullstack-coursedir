// Imports
import React from "react";
import ModifyCourseForm from "../components/ModifyCourseForm";

// Component
class CreateCourse extends React.Component {
    handleSubmit(formData) {
        // TODO: Create course with form data
        console.log("Got here", formData);
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

// Export
export default CreateCourse;
