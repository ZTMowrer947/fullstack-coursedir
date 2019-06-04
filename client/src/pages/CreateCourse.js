// Imports
import React from "react";
import ModifyCourseForm from "../components/ModifyCourseForm";

// Component
class CreateCourse extends React.Component {
    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <ModifyCourseForm user={this.props.user} />
            </div>
        );
    }
}

// Export
export default CreateCourse;
