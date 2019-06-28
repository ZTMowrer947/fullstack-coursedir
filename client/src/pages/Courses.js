// Imports
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CourseLink from "../components/CourseLink";
import LoadingIndicator from "../components/LoadingIndicator";
import { coursesFetchStart } from "../store/actions/courses";

// Components
class Courses extends React.Component {
    // Run after component has been mounted to the DOM
    componentDidMount() {
        // Fetch courses
        this.props.requestCourses();
    }

    // Render to DOM
    render() {
        // If we are still loading,
        if (this.props.isFetching)
            // Render LoadingIndicator
            return <LoadingIndicator size={40} />;

        // Map courses to Course components
        const courseList = this.props.courses.map(course => {
            return <CourseLink id={course.id} title={course.title} key={course.id} />
        });

        return (
            <div className="bounds">
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
            </div>
        );
    }
}

// Redux mapping to React props
const mapStateToProps = state => {
    const courseState = state.courses;

    return {
        courses: courseState.data,
        error: courseState.error,
        isFetching: courseState.isFetching,
    }
};

const mapDispatchToProps = dispatch => ({
    requestCourses: () => {
        dispatch(coursesFetchStart());
    },
});

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses);