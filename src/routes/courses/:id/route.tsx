import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { Await, Link, useRouteLoaderData } from 'react-router-dom';

import buttonStyles from '@/buttons.module.css';
import { courseQuery } from '@/routes/courses/:id/loader.ts';
import { User } from '@/routes/loader.ts';
import typeStyles from '@/type.module.css';

import styles from './styles.module.css';

export default function CourseDetail() {
  const authData = useRouteLoaderData('base') as { user: Promise<User | null> };
  const initialData = useRouteLoaderData('course-id') as Awaited<ReturnType<ReturnType<typeof courseQuery>['queryFn']>>;

  const { data: course } = useQuery({
    ...courseQuery(initialData.id),
    initialData,
  });

  return (
    <article>
      <nav className={styles.nav}>
        <Suspense>
          <Await resolve={authData.user}>
            {(user) => {
              if (user?.id !== course.userId) return null;

              return (
                <>
                  <Link to={`/courses/${course.id}/update`} className={buttonStyles.primary}>
                    Update Course
                  </Link>
                  <Link to={`/courses/${course.id}/delete`} className={buttonStyles.primary}>
                    Delete Course
                  </Link>
                </>
              );
            }}
          </Await>
        </Suspense>
        <Link to={'/courses'} className={buttonStyles.secondary}>
          Return to List
        </Link>
      </nav>

      <div className={styles.info}>
        <header className={styles.header}>
          <h4 className={`${typeStyles.courseLabel} ${styles.headerLabel}`}>Course</h4>
          <h3 className={`${typeStyles.courseLabel} ${styles.title}`}>{course.title}</h3>
          <p>By {`${course.user.firstName} ${course.user.lastName}`}</p>
        </header>

        <div className={styles.desc}>
          <ReactMarkdown>{course.description}</ReactMarkdown>
        </div>

        <aside className={styles.stats}>
          <ul>
            {course.estimatedTime && (
              <li>
                <h4>Estimated Time</h4>
                <h3>{course.estimatedTime}</h3>
              </li>
            )}

            {course.materialsNeeded && (
              <li>
                <h4>Materials Needed</h4>
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </article>
  );
}
