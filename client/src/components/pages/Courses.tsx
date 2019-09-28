// Imports
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Course from "../../models/Course";
import CourseService from "../../services/Course.service";
import CourseLink from "../CourseLink";
import AddCourseLink from "../AddCourseLink";
import LoadingIndicator from "../LoadingIndicator";
import "./Courses.scss";

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
        return <LoadingIndicator />;
    } else {
        // Otherwise, map courses to CourseLink components
        const courseList = courses.map(course => (
            <CourseLink key={course.id} id={course.id} title={course.title} />
        ));

        return (
            <Row>
                {courseList}
                <AddCourseLink />
            </Row>
        );
    }
};

// Export
export default Courses;
