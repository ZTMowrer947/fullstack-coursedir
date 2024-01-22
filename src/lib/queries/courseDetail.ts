import type { Course } from '../../entities/course';

async function fetchCourseDetail(id: number): Promise<Course | null> {
  const res = await fetch(`/api/courses/${id}`);

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    return null;
  } else {
    throw new Error(`Unexpected failure fetching course with ID "${id}"`);
  }
}

export default fetchCourseDetail;

export function courseDetailQuery(id: number) {
  return {
    queryKey: ['courses', id] as const,
    queryFn: () => fetchCourseDetail(id),
  };
}
