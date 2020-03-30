// Import
import { render, wait } from '@testing-library/react';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import Courses from './Courses';
import CourseApi from '../../services/CourseApi';
import CourseFaker from '../../services/__testutils__/CourseFaker';

// Mocks
jest.mock('../../services/CourseApi');

// Test Suite
describe('Courses page', () => {
    afterEach(() => {
        mocked(CourseApi.getList).mockClear();
    });

    it('should fetch a list of courses and display links for each of them', async () => {
        // Generate courses
        const courses = CourseFaker.fakeProjects();

        // Setup Course API to return mock course listing
        mocked(CourseApi.getList).mockResolvedValue(courses);

        // Render component
        const { getAllByTestId } = render(
            <StaticRouter>
                <Courses />
            </StaticRouter>
        );

        // Wait until course listing is fetched from API
        await wait(() => expect(CourseApi.getList).toHaveBeenCalled());

        // Get all course links
        const courseLinks = getAllByTestId('course-link');

        // Expect there to be a course link for each course
        expect(courseLinks).toHaveLength(courses.length);
    });
});
