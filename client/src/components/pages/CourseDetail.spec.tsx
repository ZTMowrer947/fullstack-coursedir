// Import
import { render, waitForDomChange } from '@testing-library/react';
import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import CourseDetail from './CourseDetail';
import CourseApi from '../../services/CourseApi';
import CourseFaker from '../../services/__testutils__/CourseFaker';

// Mocks
jest.mock('../../services/CourseApi');

// Test Suite
describe('CourseDetail page', () => {
    it('should fetch course data from the API and display it', async () => {
        // Generate course
        const course = CourseFaker.fakeProject();

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
