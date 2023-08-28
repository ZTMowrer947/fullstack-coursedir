import { Link } from 'react-router-dom';

import { CoursePreview } from '../queries/getCourses.ts';
import styles from './CourseLink.module.css';

interface CourseLinkProps {
  course: CoursePreview;
}

export default function CourseLink({ course }: CourseLinkProps) {
  return (
    <Link to={`${course.id}`} className={styles.courseModule}>
      <h4 className={styles.courseLabel}>Course</h4>
      <h3 className={styles.courseTitle}>{course.title}</h3>
    </Link>
  );
}
