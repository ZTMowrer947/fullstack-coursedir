// Imports
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import { StaticRouter } from 'react-router-dom';

import CourseInfo from './CourseInfo';
import CourseFaker from '../services/__testutils__/CourseFaker';

// Test Suite
describe('CourseInfo component', () => {
    it('should render the data of the course provided via props', () => {
        // Create course
        const course = CourseFaker.fakeProject();
        course.estimatedTime = `${faker.random.number({
            min: 1,
            max: 10,
        })} hours`;
        course.materialsNeeded = faker.random.word();

        // Get full name of course author
        const fullName = `${course.creator.firstName} ${course.creator.lastName}`;

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
        const courseTitle = getByTestId('course-title');
        const courseAuthor = getByTestId('course-author');
        const courseDescription = getByTestId('course-description');
        const courseEstTime = getByTestId('course-esttime');
        const courseMaterials = getByTestId('course-materials');

        // Expect course title and estimated time to match course data
        expect(courseTitle).toHaveTextContent(course.title);
        expect(courseEstTime).toHaveTextContent(course.estimatedTime!);

        // Expect course author to contain author name
        expect(courseAuthor).toContainHTML(fullName);

        // Expect course description and materials needed to contain expected markup
        expect(courseDescription).toContainHTML(descriptionMarkup);
        expect(courseMaterials).toContainHTML(materialsNeededMarkup);
    });
});
