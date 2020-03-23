// Imports
import faker from 'faker';

import User from '../../models/User';

// Faker service
export default class UserFaker {
    public static fakeUser(): User {
        return {
            id: faker.random.alphaNumeric(16).toUpperCase(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            emailAddress: faker.internet.email(),
        };
    }
}
