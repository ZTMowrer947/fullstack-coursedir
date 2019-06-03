// Imports
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
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
                <div className="grid-33">
                    <Link to="/courses/create" className="course--module course--add--module">
                        <h3 className="course--add--title">
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 13 13"
                                className="add"
                            >
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>
                            New Course
                        </h3>
                    </Link>
                </div>
            </>
        );
    }
}

// Export
export default Courses;