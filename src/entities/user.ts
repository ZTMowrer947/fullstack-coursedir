/**
 * Represents the info of a user of the application.
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

/**
 * Represents the email and password of a user.
 */
export type UserCredentials = Pick<User, 'emailAddress'> & {
  password: string;
};

/**
 * Represents the name info of the user having authored a course.
 */
export type AuthorInfo = Pick<User, 'firstName' | 'lastName'>;
