// Imports
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import Course from '../../models/Course';
import CourseApi from '../../services/CourseApi';
import CourseInfo from '../CourseInfo';
import { NotFoundError } from '../../models/errors';

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
                    flashError: new NotFoundError(),
                });

            setCourse(course);
        });
    }, [match.params.id, history]);

    console.log(course);

    return (
        course && (
            <>
                <div className="actions-bar" test-id="action-btns">
                    <div className="w-100">
                        {user?.id === course.creator.id && (
                            <>
                                <IndexLinkContainer
                                    to={`/courses/${course.id}/update`}
                                >
                                    <Button size="lg" className="mr-3">
                                        Update Course
                                    </Button>
                                </IndexLinkContainer>
                                <IndexLinkContainer
                                    to={`/courses/${course.id}/delete`}
                                >
                                    <Button size="lg" className="mr-3">
                                        Delete Course
                                    </Button>
                                </IndexLinkContainer>
                            </>
                        )}
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
