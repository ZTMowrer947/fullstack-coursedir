// Imports
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
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
    // Get user data from AuthContext
    const { user } = useContext(AuthContext);

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

    return (
        course && (
            <>
                <div className="actions-bar" test-id="action-btns">
                    <div className="w-100">
                        <IndexLinkContainer to="/">
                            <Button
                                variant="outline-primary"
                                size="lg"
                                className="mr-3"
                                data-testid="back-btn"
                            >
                                Return to List
                            </Button>
                        </IndexLinkContainer>
                    </div>
                </div>
                <CourseInfo course={course} />
            </>
        )
    );
};

// Export
export default CourseDetail;
