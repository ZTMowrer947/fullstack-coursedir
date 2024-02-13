import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData, useParams } from 'react-router-dom';

import { courseDetailQuery } from '@/lib/queries/courseDetail';

import CourseDetail from './course-detail';
import { CourseDetailData } from './loader';

export default function CourseInfo() {
  const initialData = useLoaderData() as CourseDetailData;
  const { id } = useParams();
  const query = useQuery({
    ...courseDetailQuery(Number.parseInt(id!.toString(), 10)),
    initialData,
  });

  if (query.isError) {
    return <div>Error!</div>;
  }

  if (query.isSuccess && query.data == null) {
    return (
      <div>
        <p>Course not found</p>
      </div>
    );
  } else if (query.isSuccess && !!query.data) {
    const course = query.data;

    return (
      <div>
        <div>
          <Link to={'..'}>Back to list</Link>
        </div>
        <CourseDetail course={course} />
      </div>
    );
  }

  return <></>;
}
