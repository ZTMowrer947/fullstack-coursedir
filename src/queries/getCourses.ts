import { apiBaseUrl } from '../config.ts';

export interface CoursePreview {
  id: number;
  title: string;
}

export default async function getCourses(): Promise<CoursePreview[]> {
  const res = await fetch(`${apiBaseUrl}/api/courses`);

  if (res.ok) {
    return await res.json();
  }

  throw new Error('Could not fetch course listing');
}
