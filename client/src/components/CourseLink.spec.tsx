// Imports
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import Course from '../models/Course';
import { StaticRouter } from 'react-router-dom';
import CourseLink from './CourseLink';

// Test Suite
describe('CourseLink component', () => {
    it("should render a link containing a course's ID and title", () => {
        // Generate course data
        const course: Course = {
            id: faker.random.alphaNumeric(16).toUpperCase(),
            title: faker.random.words(3),
            description: faker.lorem.paragraphs(3),
        };

        // Define expected link URL
        const expectedLink = `/courses/${course.id}`;

        // Render component
        const { getByTestId } = render(
            <StaticRouter>
                <CourseLink course={course} />
            </StaticRouter>
        );

        // Get course link and title by test ID
        const courseLink = getByTestId('course-link');
        const courseTitle = getByTestId('course-title');

        expect(courseLink).toHaveAttribute('href', expectedLink);
        expect(courseTitle).toHaveTextContent(course.title);
    });
});
