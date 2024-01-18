import { useQuery } from '@tanstack/react-query';
import { courseListQuery } from '../../lib/queries/courseList';
import CourseList from './course-list';

export default function Courses() {
  const query = useQuery(courseListQuery);

  return (
    <div>
      <h1>Courses</h1>
      {query.isPending && 'Loading...'}
      {query.isError && 'Error!'}
      {query.data && <CourseList courses={query.data} />}
    </div>
  );
}
