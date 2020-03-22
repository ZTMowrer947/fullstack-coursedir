// Imports
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

import CourseInfo from './CourseInfo';
import Course from '../models/Course';
import { StaticRouter } from 'react-router-dom';

// Test Suite
describe('CourseInfo component', () => {
    it('should render the data of the course provided via props', () => {
        // Create course
        const course: Course = {
            id: faker.random.alphaNumeric(16).toUpperCase(),
            title: faker.random.words(3),
            description: faker.lorem.paragraphs(3),
            estimatedTime: `${faker.random.number({ min: 1, max: 10 })} hours`,
            materialsNeeded: faker.random.word(),
        };

        // Render description and needed materials to markup
        const descriptionMarkup = renderToStaticMarkup(
            <ReactMarkdown source={course.description} />
        );
        const materialsNeededMarkup = renderToStaticMarkup(
            <ReactMarkdown source={course.materialsNeeded} />
        );

        // Render component
        const { getByTestId } = render(
            <StaticRouter>
                <CourseInfo course={course} />
            </StaticRouter>
        );

        // Get elements to test
        const backBtn = getByTestId('back-btn');
        const courseTitle = getByTestId('course-title');
        const courseDescription = getByTestId('course-description');
        const courseEstTime = getByTestId('course-esttime');
        const courseMaterials = getByTestId('course-materials');

        // Expect back btn to link to home page
        expect(backBtn).toHaveAttribute('href', '/');

        // Expect course title and estimated time to match course data
        expect(courseTitle).toHaveTextContent(course.title);
        expect(courseEstTime).toHaveTextContent(course.estimatedTime!);

        // Expect course description and materials needed to contain expected markup
        expect(courseDescription).toContainHTML(descriptionMarkup);
        expect(courseMaterials).toContainHTML(materialsNeededMarkup);
    });
});
