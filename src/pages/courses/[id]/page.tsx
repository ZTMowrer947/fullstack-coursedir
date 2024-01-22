import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { courseDetailQuery } from '../../../lib/queries/courseDetail';
import CourseDetail from './course-detail';

export default function CourseInfo() {
  const { id } = useParams();
  const query = useQuery(courseDetailQuery(Number.parseInt(id!.toString(), 10)));

  return (
    <div>
      {query.isPending && 'Loading...'}
      {query.isError && 'Error!'}
      {query.isSuccess && (query.data ? <CourseDetail course={query.data} /> : <p>Course not found</p>)}
    </div>
  );
}
