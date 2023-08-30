import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router-dom';

import CourseLink from '@/components/CourseLink.tsx';

import { coursesQuery } from './loader.ts';
import styles from './styles.module.css';

export default function CourseListing() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof coursesQuery.queryFn>>;

  const { data } = useQuery({
    ...coursesQuery,
    initialData,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((course) => (
        <CourseLink course={course} key={course.id} />
      ))}
      <Link to={'new'} className={styles.courseAddModule}>
        <h3 className={styles.addModuleTitle}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className={styles.svg}
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </h3>
      </Link>
    </div>
  );
}
