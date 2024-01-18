import { useQuery } from '@tanstack/react-query';
import { courseListQuery } from '../../lib/queries/courseList';

export default function Courses() {
  const query = useQuery(courseListQuery);

  return (
    <div>
      <h1>Courses</h1>
      {query.isPending && 'Loading...'}
      {query.isError && 'Error!'}
      {query.isSuccess && <ul>{query.data?.map((course) => <li key={course.id}>{course.title}</li>)}</ul>}
    </div>
  );
}
