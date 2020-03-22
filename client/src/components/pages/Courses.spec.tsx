// Import
import { render, waitForDomChange } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import Courses from './Courses';
import Course from '../../models/Course';
import CourseApi from '../../services/CourseApi';

// Mocks
jest.mock('../../services/CourseApi');

// Test Suite
describe('Courses page', () => {
    it('should fetch a list of courses and display links for each of them', async () => {
        // Generate courses
        const coursesToGenerate = 10;
        const courses: Course[] = [];

        for (let i = 0; i < coursesToGenerate; i++) {
            const course: Course = {
                id: faker.random.alphaNumeric(16).toUpperCase(),
                title: faker.random.words(3),
                description: faker.lorem.paragraphs(3),
            };

            courses.push(course);
        }

        // Setup Course API to return mock course listing
        mocked(CourseApi.getList).mockResolvedValue(courses);

        // Render component
        const { getAllByTestId } = render(
            <StaticRouter>
                <Courses />
            </StaticRouter>
        );

        // Expect component to have fetched course listing from API
        expect(CourseApi.getList).toHaveBeenCalled();

        // Wait for DOM changes
        await waitForDomChange();

        // Get all course links
        const courseLinks = getAllByTestId('course-link');

        // Expect there to be a course link for each course
        expect(courseLinks).toHaveLength(courses.length);
    });
});
