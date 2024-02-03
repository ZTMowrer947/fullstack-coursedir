import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import { courseListQuery } from '../../lib/queries/courseList';
import CourseList from './course-list';
import { CourseListData } from './loader';

export default function Courses() {
  const initialData = useLoaderData() as CourseListData;

  const query = useQuery({
    ...courseListQuery,
    initialData,
  });

  return (
    <div>
      <h1>Courses</h1>
      {query.isPending && 'Loading...'}
      {query.isError && 'Error!'}
      {query.data && <CourseList courses={query.data} />}
    </div>
  );
}
