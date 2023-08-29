import { parse } from 'yaml';

import seederYaml from './seeder_data.yaml?raw';

// Database types
interface DbUser {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

interface DbCourse {
  id: number;
  userId: number;
  title: string;
  description: string;
  estimatedTime: string | null;
  materialsNeeded: string | null;
  createdAt: number;
  updatedAt: number;
}

type YamlUser = Pick<DbUser, 'firstName' | 'lastName' | 'emailAddress' | 'password'>;
type YamlCourse = Pick<DbCourse, 'title' | 'description' | 'userId'> &
  Partial<Pick<DbCourse, 'estimatedTime' | 'materialsNeeded'>>;

// Mock "database" initialization
const courses: DbCourse[] = [];
const users: DbUser[] = [];
const nextIds = {
  user: 1,
  course: 1,
};

if (courses.length === 0 && users.length === 0) {
  // Seed mock DB with course and user data
  const seedData = parse(seederYaml);

  seedData.users.forEach((user: YamlUser) => {
    const creationTime = Date.now();
    const dbUser: DbUser = {
      id: nextIds.user++,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password, // Don't try this at home, kids
      createdAt: creationTime,
      updatedAt: creationTime,
    };

    users.push(dbUser);
  });

  seedData.courses.forEach((course: YamlCourse) => {
    const creationTime = Date.now();
    const dbCourse: DbCourse = {
      id: nextIds.course++,
      userId: course.userId,
      title: course.title,
      description: course.description,
      estimatedTime: course.estimatedTime ?? null,
      materialsNeeded: course.materialsNeeded ?? null,
      createdAt: creationTime,
      updatedAt: creationTime,
    };

    courses.push(dbCourse);
  });
}

// "Database" queries
type CoursePreview = Pick<DbCourse, 'id' | 'title'>;
interface CourseData extends Omit<DbCourse, 'createdAt' | 'updatedAt'> {
  user: Pick<DbUser, 'firstName' | 'lastName'>;
}

export function getMockCourses(): CoursePreview[] {
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
  }));
}

export function getMockCourse(id: number): CourseData | null {
  const course = courses.find((crs) => crs.id === id);

  if (!course) return null;

  const author = users.find((user) => user.id === course.userId);

  if (!author) throw new Error('Course associated with nonexistent user');

  return {
    id: course.id,
    userId: course.userId,
    title: course.title,
    description: course.description,
    estimatedTime: course.estimatedTime,
    materialsNeeded: course.materialsNeeded,
    user: {
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
}
