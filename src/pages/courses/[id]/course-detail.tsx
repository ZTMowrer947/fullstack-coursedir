import type { Course } from '@/entities/course';

export interface CourseDetailProps {
  course: Course;
}

export default function CourseDetail({ course }: CourseDetailProps) {
  return (
    <div>
      <h1>{course.title}</h1>
      <div>{course.description}</div>
      <div>
        {course.estimatedTime && (
          <div>
            <h3>Estimated Time</h3>
            <h4>{course.estimatedTime}</h4>
          </div>
        )}
        {course.materialsNeeded && (
          <div>
            <h3>Materials Needed</h3>
            <div>{course.materialsNeeded}</div>
          </div>
        )}
      </div>
    </div>
  );
}
