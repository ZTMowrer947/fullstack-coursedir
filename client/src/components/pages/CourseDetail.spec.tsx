// Import
import { render, waitForDomChange } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import Course from '../../models/Course';
import CourseApi from '../../services/CourseApi';
import CourseDetail from './CourseDetail';

// Mocks
jest.mock('../../services/CourseApi');

// Test Suite
describe('CourseDetail page', () => {
    it('should fetch course data from the API and display it', async () => {
        // Generate course
        const course: Course = {
            id: faker.random.alphaNumeric(16).toUpperCase(),
            title: faker.random.words(3),
            description: faker.lorem.paragraphs(3),
        };

        // Setup Course API to return mock course data
        mocked(CourseApi.get).mockResolvedValue(course);

        // Render component
        const { queryByText } = render(
            <StaticRouter location={`/${course.id}`}>
                <Route path="/:id" component={CourseDetail} />
            </StaticRouter>
        );

        // Wait for DOM changes
        await waitForDomChange();

        // Expect component to have fetched course data from API
        expect(CourseApi.get).toHaveBeenCalled();

        // Expect course title to exist in document
        const courseTitle = queryByText(course.title);
        expect(courseTitle).toBeInTheDocument();
    });
});
