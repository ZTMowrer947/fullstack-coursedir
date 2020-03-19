// Imports
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Course from '../../models/Course';
import CourseApi from '../../services/CourseApi';
import CourseInfo from '../CourseInfo';

// Route params
interface RouteParams {
    id: string;
}

// Component
const CourseDetail: React.FC<RouteComponentProps<RouteParams>> = ({
    history,
    match,
}) => {
    // Initialize state
    const [course, setCourse] = useState<Course | null>(null);

    // Fetch data on initial course load
    useEffect(() => {
        CourseApi.get(match.params.id).then(course => {
            if (!course)
                return history.push('/courses', {
                    courseNotFound: true,
                });

            setCourse(course);
        });
    }, [match.params.id, history]);

    return course && <CourseInfo course={course} />;
};

// Export
export default CourseDetail;
