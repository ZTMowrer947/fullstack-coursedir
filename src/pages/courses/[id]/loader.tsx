import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { courseDetailQuery } from '@/lib/queries/courseDetail';

const courseDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    const idNum = id ? Number.parseInt(id, 10) : undefined;

    // Throw 400
    if (!idNum || Number.isNaN(idNum)) {
      throw new Response('Invalid ID', { status: 400 });
    }

    const query = courseDetailQuery(idNum);

    const result = await queryClient.ensureQueryData(query);

    // If course is not found, throw 404
    if (!result) throw new Response(`No course with ID "${idNum}"`, { status: 404 });

    return result;
  };

export type CourseDetailData = Awaited<ReturnType<ReturnType<typeof courseDetailLoader>>>;

export default courseDetailLoader;
