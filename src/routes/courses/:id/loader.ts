import { QueryClient } from '@tanstack/react-query';
import { LoaderFunction } from 'react-router-dom';

import { apiBaseUrl } from '@/config.ts';
import { CoursePreview } from '@/routes/courses/loader.ts';

export interface Course extends CoursePreview {
  description: string;
  estimatedTime: string | null;
  materialsNeeded: string | null;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

export const courseQuery = (id: number) => {
  return {
    queryKey: ['course', id],
    queryFn: async (): Promise<Course> => {
      const encodedId = encodeURIComponent(id);

      const res = await fetch(`${apiBaseUrl}/api/courses/${encodedId}`);

      if (res.ok) {
        return await res.json();
      } else if (res.status === 404) {
        throw new Error(`No course with ID ${id}`);
      } else {
        throw new Error(`Unexpected error trying to fetch course with id ${id}`);
      }
    },
  };
};

const courseLoader = (queryClient: QueryClient): LoaderFunction => {
  return async ({ params }) => {
    const { id: idParam } = params;
    const id = Number.parseInt(idParam!);

    if (Number.isNaN(id)) throw new Error('id must be numeric');

    const query = courseQuery(id);

    return queryClient.ensureQueryData(query.queryKey, query.queryFn);
  };
};

export default courseLoader;
