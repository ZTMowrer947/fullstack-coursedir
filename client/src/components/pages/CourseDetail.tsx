// Imports
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CourseModel from "../../models/Course";
import CourseService from "../../services/Course.service";
import Course from "../Course";
import LoadingIndicator from "../LoadingIndicator";

// Component
const CourseDetail: React.FC = () => {
    // Initialize state
    const [course, setCourse] = useState<CourseModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Get ID param from route
    const { id } = useParams();

    // If ID is undefined, and an error has not yet been set,
    if (!id && !error) {
        // Set error state
        setError(
            new Error(
                "An ID param is required for this route, but not provided."
            )
        );

        // Unset loading state
        setLoading(false);
    }

    // Fetch course data if needed
    useEffect(() => {
        // If course data is null, and an error has not yet been set,
        if (!course && !error) {
            // Fetch course data
            CourseService.getById(id!)
                .then(course => {
                    // Set course state
                    setCourse(course);

                    // Unset loading state
                    setLoading(false);
                })
                .catch(err => {
                    // Set error state
                    setError(err);

                    // Unset loading state
                    setLoading(false);
                });
        }
    }, [course, error, id]);

    // If we are currently loading,
    if (loading) {
        // Render loading indicator
        return <LoadingIndicator />;
    } else if (error) {
        // If an error was encountered,

        // Render a simple error message (for now)
        return <h1>Error</h1>;
    } else {
        // Otherwise, render Course data
        return <Course course={course!} />;
    }
};

// Export
export default CourseDetail;
