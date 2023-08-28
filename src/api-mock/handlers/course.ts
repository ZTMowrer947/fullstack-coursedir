import { rest } from 'msw';

import { apiBaseUrl } from '../../config.ts';

export const courseListing = rest.get(`${apiBaseUrl}/api/courses`, (_req, res, ctx) => {
  return res(ctx.status(503));
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
