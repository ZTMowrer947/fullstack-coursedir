import { useQuery } from '@tanstack/react-query';

import getCourses from '../queries/getCourses.ts';

export default function CourseListing() {
  const { error, data, isLoading } = useQuery({ queryKey: ['courses'], queryFn: getCourses });

  if (isLoading) return null;

  if (error) return <h1>Something went wrong</h1>;

  return <ul>{data?.map((course) => <li key={course.id}>{course.title}</li>)}</ul>;
}
