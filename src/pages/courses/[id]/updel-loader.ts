import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { User } from '@/entities/user.ts';
import courseDetailLoader from '@/pages/courses/[id]/loader.tsx';

const courseUpdateDeleteLoader = (queryClient: QueryClient, user: User) => async (args: LoaderFunctionArgs) => {
  // Fetch course using course detail loader
  const course = await courseDetailLoader(queryClient)(args);

  // If course does not belong to user, throw 403
  if (course.userId !== user.id) throw new Response(`Not authorized to delete this course`, { status: 403 });

  return course;
};

export type CourseUpdateDeleteData = Awaited<ReturnType<ReturnType<typeof courseUpdateDeleteLoader>>>;

export default courseUpdateDeleteLoader;
