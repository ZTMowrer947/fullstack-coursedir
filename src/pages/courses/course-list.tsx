import { Link } from 'react-router-dom';
import type { CoursePreview } from '../../entities/course';

export interface CourseListProps {
  courses: CoursePreview[];
}

export default function CourseList({ courses }: CourseListProps) {
  const courseItems = courses.map((course) => (
    <li key={course.id}>
      <Link to={`/courses/${course.id.toString()}`}>{course.title}</Link>
    </li>
  ));

  return <ul>{courseItems}</ul>;
}
