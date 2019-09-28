// Imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Course from "../../models/Course";
import CourseService from "../../services/Course.service";
import CourseLink from "../CourseLink";

// Component
const Courses: React.FC = () => {
    // Initialize state
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);

    // Fetch course data if needed
    useEffect(() => {
        // If we have no courses, and have not encountered an error,
        if (courses.length === 0 && !error) {
            // Remove any previous errors
            setError(null);

            // Fetch course data
            CourseService.getList()
                .then(courses => {
                    // If successful, unset loading flag
                    setLoading(false);

                    // Update state with course listing
                    setCourses(courses);
                })
                .catch(err => {
                    // If an error occurred, set error
                    setError(err);
                });
        }
    }, [courses.length, error]);

    // If we are loading,
    if (loading) {
        return <h1>Loading...</h1>;
    } else {
        // Otherwise, map courses to CourseLink components
        const courseList = courses.map(course => (
            <CourseLink key={course.id} id={course.id} title={course.title} />
        ));

        return (
            <div className="bounds">
                {courseList}
                <div className="grid-33">
                    <Link
                        to="/courses/create"
                        className="course--module course--add--module"
                    >
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
};

// Export
export default Courses;
