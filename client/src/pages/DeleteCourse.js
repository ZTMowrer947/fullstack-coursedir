// Imports
import PropTypes from "prop-types";
import React from "react";

// Component
class DeleteCourse extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            confirmTitle: "",
        }
    }

    // Handle input changes
    handleInputChange(event) {
        // Get event target's name and value
        const { name, value } = event.target;

        // Update state for input field
        this.setState({
            [name]: value,
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();
    }

    // Render to DOM
    render() {
        return (
            <div className="bounds">
                <h1>Delete Course</h1>
                <div>
                    <form method="POST" onSubmit={this.handleFormSubmit.bind(this)}>

                    </form>
                </div>
            </div>
        );
    }
}

// Prop Types
DeleteCourse.propTypes = {
    user: PropTypes.shape({
        emailAddress: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default DeleteCourse;