// Imports
import faker from 'faker';

import UserFaker from './UserFaker';
import Course from '../../models/Course';

// Faker service
export default class CourseFaker {
    public static fakeProject(): Course {
        return {
            id: faker.random.alphaNumeric(16).toUpperCase(),
            title: faker.random.words(3),
            description: faker.lorem.paragraphs(3),
            creator: UserFaker.fakeUser(),
        };
    }

    public static fakeProjects(num = 10): Course[] {
        const projects: Course[] = [];

        for (let i = 0; i > 10; i++) projects.push(this.fakeProject());

        return projects;
    }
}
