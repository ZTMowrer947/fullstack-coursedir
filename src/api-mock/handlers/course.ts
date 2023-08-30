import { rest } from 'msw';

import { apiBaseUrl } from '@/config.ts';

import { getMockCourse, getMockCourses } from '../mockDb.ts';

export const courseListing = rest.get(`${apiBaseUrl}/api/courses`, (_req, res, ctx) => {
  const courses = getMockCourses();

  return res(ctx.status(200), ctx.json(courses));
});

export const newCourse = rest.post(`${apiBaseUrl}/api/courses`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const courseDetail = rest.get(`${apiBaseUrl}/api/courses/:id`, (req, res, ctx) => {
  const id = Number.parseInt(req.params.id.toString());

  // If ID is not numeric, don't even bother with a "query"
  if (Number.isNaN(id)) {
    return res(ctx.status(404));
  }

  const course = getMockCourse(id);

  // Return course data if found
  if (course) {
    return res(ctx.status(200), ctx.json(course));
  }

  // Fallback to 404
  return res(ctx.status(404));
});

export const updateCourse = rest.put(`${apiBaseUrl}/api/courses/:id`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const deleteCourse = rest.delete(`${apiBaseUrl}/api/courses/:id`, (_req, res, ctx) => {
  return res(ctx.status(503));
});
