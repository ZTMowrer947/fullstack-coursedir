import { http, HttpResponse, RequestHandler } from 'msw';
import { ValidationError } from 'yup';

import { Course } from '@/entities/course';
import { courseSchema, CourseUpsertData } from '@/lib/mutations/newCourse.ts';
import ensureAuth from '@/mocks/api/auth.ts';

import db from './db';

function findCourseById(id: number): Course | null {
  const course = db.course.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  return course != null
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
}

const courseHandlers: RequestHandler[] = [
  http.get('/api/courses', () => {
    // Get courses and map into previews
    const courses = db.course.findMany({}).map(({ id, title }) => ({ id, title }));

    return HttpResponse.json(courses);
  }),

  http.get('/api/courses/:id', ({ params }) => {
    const id = Number.parseInt(params.id.toString(), 10);

    const course = findCourseById(id);

    if (course) {
      return HttpResponse.json<Course | { message: string }>(course);
    } else {
      return HttpResponse.json({ message: 'not found' }, { status: 404 });
    }
  }),

  http.post('/api/courses', async ({ request }) => {
    const authResult = ensureAuth(request.headers.get('authorization'));

    if (authResult instanceof Response) return authResult;

    // Extract ID of authenticated user
    const user = authResult;

    const data = await request.json();

    // Validate course data, throwing a 400 if it fails
    let result: CourseUpsertData;

    try {
      result = await courseSchema.validate(data, { abortEarly: false });
    } catch (err) {
      const validationErrors = err as ValidationError;

      return HttpResponse.json(validationErrors, { status: 400 });
    }

    // Create course in mock DB and attach to user
    const { id, title, description, estimatedTime, materialsNeeded } = db.course.create({
      ...result,
      author: user,
    });

    // Construct course data to return to client
    const course: Course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: user.id,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    return HttpResponse.json<Course | { message: string }>(course, {
      status: 201,
      headers: {
        location: `/api/courses/${course.id}`,
      },
    });
  }),

  http.put('/api/courses/:id', () => {
    return new HttpResponse(null, { status: 503 });
  }),

  http.delete('/api/courses/:id', () => {
    return new HttpResponse(null, { status: 503 });
  }),
];

export default courseHandlers;
