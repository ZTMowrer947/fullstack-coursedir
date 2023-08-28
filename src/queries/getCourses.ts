import { QueryClient } from '@tanstack/react-query';
import { LoaderFunction } from 'react-router-dom';

import { apiBaseUrl } from '../config.ts';

export interface CoursePreview {
  id: number;
  title: string;
}

export default async function getCourses(): Promise<CoursePreview[]> {
  const res = await fetch(`${apiBaseUrl}/api/courses`);

  if (res.ok) {
    return await res.json();
  }

  throw new Error('Could not fetch course listing');
}

export const coursesQuery = {
  queryKey: ['courses'],
  queryFn: getCourses,
};

export const loader = (queryClient: QueryClient): LoaderFunction => {
  return async () => {
    return queryClient.ensureQueryData(coursesQuery.queryKey, coursesQuery.queryFn, {
      retry: 3,
    });
  };
};
