import { factory, primaryKey, oneOf, nullable } from '@mswjs/data';
import { faker } from '@faker-js/faker';

// Set a consistent seed for reusable results
faker.seed(11224);

// Create an auto-incrementing ID closure, to simulate a SQL PK
const autoIncrementFactory = () => {
  let nextId: number = 1;

  return () => nextId++;
};

const userIdFactory = autoIncrementFactory();
const courseIdFactory = autoIncrementFactory();

const db = factory({
  user: {
    id: primaryKey(userIdFactory),
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: String,
  },
  course: {
    id: primaryKey(courseIdFactory),
    author: oneOf('user'),
    title: String,
    description: String,
    estimatedTime: nullable(String),
    materialsNeeded: nullable(String),
  },
});

// Flip a coin, if heads run the seeder, if not return null
function maybeSeedVal<T>(seeder: () => T): T | null {
  const shouldSeed = faker.datatype.boolean();

  return shouldSeed ? seeder() : null;
}

export function seedDb() {
  Array.from({ length: 2 }).forEach(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const emailAddress = faker.internet.email({ firstName, lastName });
    const password = faker.internet.password();

    const user = db.user.create({
      firstName,
      lastName,
      emailAddress,
      password, // Professional idiot on mock course. Don't do this in production.
    });

    // Add four courses per user
    Array.from({ length: 4 }).forEach(() => {
      db.course.create({
        author: user,
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        // Possible list between 1-15 hours of needed time
        estimatedTime: maybeSeedVal(() => `${faker.number.int({ min: 1, max: 15 })} hours`),
        // Possibly generate a list of 2-7 needed materials
        materialsNeeded: maybeSeedVal(() => {
          const listLength = faker.number.int({ min: 2, max: 7 });

          return Array.from({ length: listLength }, () => `- ${faker.lorem.words({ min: 5, max: 10 })}`).join('\n');
        }),
      });
    });
  });
}

export default db;
