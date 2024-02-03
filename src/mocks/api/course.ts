import { http, HttpResponse, RequestHandler } from 'msw';

import { Course } from '@/entities/course';

import db from './db';

const courseHandlers: RequestHandler[] = [
  http.get('/api/courses', () => {
    // Get courses and map into previews
    const courses = db.course.findMany({}).map(({ id, title }) => ({ id, title }));

    return HttpResponse.json(courses);
  }),

  http.get('/api/courses/:id', ({ params }) => {
    const id = Number.parseInt(params.id.toString(), 10);

    const course = db.course.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });

    const mappedCourse: Course | null =
      course != null
        ? {
            id: course.id,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.author!.id,
            user: {
              firstName: course.author!.firstName,
              lastName: course.author!.lastName,
            },
          }
        : null;

    if (mappedCourse) {
      return HttpResponse.json<Course | { message: string }>(mappedCourse);
    } else {
      return HttpResponse.json({ message: 'not found' }, { status: 401 });
    }
  }),
];

export default courseHandlers;
