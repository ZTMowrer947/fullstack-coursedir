import type { QueryKey } from '@tanstack/react-query';

import type { CoursePreview } from '@/entities/course';

const queryKey: QueryKey = ['courses'];

async function fetchCourseList(): Promise<CoursePreview[]> {
  const res = await fetch('/api/courses');

  if (!res.ok)
    // TODO: Add more robust error type and message
    throw new Error(`Unexpected error fetching course listing`);

  return res.json();
}

export default fetchCourseList;

export const courseListQuery = {
  queryKey,
  queryFn: fetchCourseList,
};
