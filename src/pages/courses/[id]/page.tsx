import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Await, Link, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';

import { courseDetailQuery } from '@/lib/queries/courseDetail';
import { AuthLoaderData } from '@/pages/(auth)/loader.ts';

import CourseDetail from './course-detail';
import { CourseDetailData } from './loader';

export default function CourseInfo() {
  const initialData = useLoaderData() as CourseDetailData;
  const authData = useRouteLoaderData('base') as AuthLoaderData;
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
          <Suspense fallback={<></>}>
            <Await resolve={authData.user}>
              {(user: Awaited<AuthLoaderData['user']>) =>
                user?.id === course.userId ? (
                  <>
                    <Link to={'update'}>Update Course</Link>
                    <Link to={'delete'}>Delete Course</Link>
                  </>
                ) : null
              }
            </Await>
          </Suspense>
        </div>
        <CourseDetail course={course} />
      </div>
    );
  }

  return <></>;
}
