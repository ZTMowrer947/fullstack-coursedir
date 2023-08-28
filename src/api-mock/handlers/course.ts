import { rest } from 'msw';

import { apiBaseUrl } from '../../config.ts';
import db from '../db.ts';

interface DBCoursePreview {
  id: number;
  title: string;
}

export const courseListing = rest.get(`${apiBaseUrl}/api/courses`, (_req, res, ctx) => {
  const stmt = db.prepare(`SELECT id, title FROM Course`);
  const courses: DBCoursePreview[] = [];

  // Collect results from mock DB into array
  while (stmt.step()) courses.push(stmt.getAsObject() as unknown as DBCoursePreview);

  stmt.free();

  return res(ctx.status(200), ctx.json(courses));
});

export const newCourse = rest.post(`${apiBaseUrl}/api/courses`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const courseDetail = rest.get(`${apiBaseUrl}/api/courses/:id`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const updateCourse = rest.put(`${apiBaseUrl}/api/courses/:id`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const deleteCourse = rest.delete(`${apiBaseUrl}/api/courses/:id`, (_req, res, ctx) => {
  return res(ctx.status(503));
});
