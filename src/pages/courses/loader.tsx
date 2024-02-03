import { QueryClient } from '@tanstack/react-query';

import { courseListQuery } from '@/lib/queries/courseList';

const courseListLoader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData(courseListQuery);
};

export type CourseListData = Awaited<ReturnType<ReturnType<typeof courseListLoader>>>;

export default courseListLoader;
