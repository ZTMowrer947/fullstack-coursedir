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

export default async function getCourse(id: Course['id']): Promise<Course | null> {
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
    queryFn: () => getCourse(id),
  };
};
