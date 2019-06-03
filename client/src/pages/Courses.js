// Imports
import axios from "axios";
import React from "react";
import Course from "../components/Course";

// Components
class Courses extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            courses: [],
            error: null,
        };
    }

    // Run after component has been mounted to the DOM
    componentDidMount() {
        // Request course listing from API
        axios
            .get("http://localhost:5000/api/courses")
            // If successful,
            .then(response => {
                // Update state with course listing
                this.setState({
                    courses: response.data,
                });
            });
        // TODO: Handle errors
    }

    // Render to DOM
    render() {
        // Map courses to Course components
        const courseList = this.state.courses.map(course => {
            return <Course id={course.id} title={course.title} key={course.id} />
        });

        return (
            <>
                {courseList}
                {/* TODO: Add "New course" link */}
            </>
        );
    }
}

// Export
export default Courses;