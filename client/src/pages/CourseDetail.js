// Imports
import axios from "axios";
import React from "react";
import Course from "../components/Course";

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
            });
        // TODO: Handle error
    }

    // Render to DOM
    render() {
        // If the loading process has finished
        if (!this.state.isLoading) {
            // TODO: Handle error
            // Render course data
            return (
                <Course {...this.state.course} />
            );
        }

        // Otherwise, render loading message
        return <h1>Loading...</h1>;
    }
}

// Export
export default CourseDetail;
