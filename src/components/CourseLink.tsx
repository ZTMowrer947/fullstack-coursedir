import { Link } from 'react-router-dom';

import { CoursePreview } from '../routes/courses/loader.ts';
import textStyles from '../type.module.css';
import styles from './CourseLink.module.css';

interface CourseLinkProps {
  course: CoursePreview;
}

export default function CourseLink({ course }: CourseLinkProps) {
  return (
    <Link to={`${course.id}`} className={styles.courseModule}>
      <h4 className={textStyles.courseLabel}>Course</h4>
      <h3 className={`${textStyles.courseTitle} ${styles.courseModuleTitle}`}>{course.title}</h3>
    </Link>
  );
}
