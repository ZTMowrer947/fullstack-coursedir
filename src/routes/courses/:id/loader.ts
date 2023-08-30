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

async function getCourse(id: Course['id']): Promise<Course | null> {
  const encodedId = encodeURIComponent(id);

  const res = await fetch(`${apiBaseUrl}/api/courses/${encodedId}`);

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    return null;
  } else {
    throw new Error(`Unexpected error trying to fetch course with id ${id}`);
  }
}

export const courseQuery = (id: number) => {
  return {
    queryKey: ['course', id],
    queryFn: async () => {
      const course = await getCourse(id);

      if (!course) {
        throw new Error(`No course with ID ${id}`);
      }

      return course;
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
