// Imports
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';

import CourseLink from '../CourseLink';
import Course from '../../models/Course';
import CourseApi from '../../services/CourseApi';

// Component
const Courses: React.FC = () => {
    // Initialize state
    const [courses, setCourses] = useState<Course[]>([]);

    // Effects
    useEffect(() => {
        // If course list length is zero,
        if (courses.length === 0) {
            // Fetch course listing and attach to state
            CourseApi.getList().then(courses => setCourses(courses));
        }
    }, [courses]);

    // Display results
    return (
        <Row>
            {courses.map(course => (
                <CourseLink course={course} key={course.id} />
            ))}
        </Row>
    );
};

// Export
export default Courses;
