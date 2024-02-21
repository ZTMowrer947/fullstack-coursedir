import { object, ObjectSchema, string, ValidationError } from 'yup';

import type { Course } from '@/entities/course.ts';
import { UserCredentials } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import HttpError from '@/lib/errors/http.ts';

export type CourseUpsertData = Pick<Course, 'title' | 'description' | 'estimatedTime' | 'materialsNeeded'>;

export const courseSchema: ObjectSchema<CourseUpsertData> = object({
  title: string().defined().required(),
  description: string().defined().required(),
  estimatedTime: string().nullable().defined(),
  materialsNeeded: string().nullable().defined(),
});

async function createNewCourse(credentials: UserCredentials, courseData: CourseUpsertData) {
  const encodedCredentials = `Basic ${AuthManager.encodeCredentials(credentials)}`;
  const res = await fetch('/api/courses', {
    method: 'POST',
    body: JSON.stringify(courseData),
    headers: {
      authorization: encodedCredentials,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });

  if (res.ok) {
    return (await res.json()) as Course;
  } else if (res.status === 400) {
    throw new (await res.json())() as ValidationError;
  } else if (res.status === 401) {
    throw new HttpError('Not authorized to create course', 401);
  } else {
    throw new HttpError('Unexpected failure during course creation');
  }
}

export default createNewCourse;
