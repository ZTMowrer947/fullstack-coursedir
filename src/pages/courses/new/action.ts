import type { QueryClient } from '@tanstack/react-query';
import { ActionFunction, redirect } from 'react-router-dom';
import type { ValidationError } from 'yup';

import type { Course } from '@/entities/course.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import HttpError from '@/lib/errors/http.ts';
import createNewCourse, { CourseUpsertData } from '@/lib/mutations/newCourse.ts';
import { courseDetailQuery } from '@/lib/queries/courseDetail.ts';

export type NewCourseActionResult = { err: ValidationError; timestamp: number } | Response;

export default function newCourseAction(queryClient: QueryClient): ActionFunction {
  return async ({ request }) => {
    const data: CourseUpsertData = await request.json();

    // Convert empty string for optional properties to null
    if (data.estimatedTime === '') data.estimatedTime = null;

    if (data.materialsNeeded === '') data.materialsNeeded = null;

    let newCourse: Course;
    try {
      newCourse = await createNewCourse(AuthManager.credentials!, data);
    } catch (err) {
      // Pass validation errors back to submitter
      if (!!err && typeof err === 'object' && 'name' in err && err.name === 'ValidationError') {
        return { err: err as ValidationError, timestamp: Date.now() };
      }

      // Rethrow any non-HttpErrors
      if (!(err instanceof HttpError)) {
        throw err;
      }

      // Convert HttpError to failed response
      throw Response.json({ message: err.message }, { status: err.code });
    }

    // After successful course creation, store new course in query cache
    const courseQuery = courseDetailQuery(newCourse.id);

    queryClient.setQueryData(courseQuery.queryKey, newCourse);

    // Redirect to newly created course
    return redirect(`/courses/${newCourse.id}`);
  };
}
