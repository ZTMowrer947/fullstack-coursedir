import { AuthorInfo } from './user';

/**
 * Represents the information of a course in the directory.
 */
export interface Course {
  id: number;
  userId: number;
  title: string;
  description: string;
  estimatedTime?: string;
  materialsNeeded?: string;
  user: AuthorInfo;
}

/**
 * Represents the preview info of a course.
 */
export type CoursePreview = Pick<Course, 'id' | 'title'>;
