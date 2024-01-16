import { HttpResponse, RequestHandler, http } from 'msw';
import db from './db';

const handlers: RequestHandler[] = [
  http.get('/api/courses', () => {
    // Get courses and map into previews
    const courses = db.course.findMany({}).map(({ id, title }) => ({ id, title }));

    return HttpResponse.json(courses);
  }),
];

export default handlers;
