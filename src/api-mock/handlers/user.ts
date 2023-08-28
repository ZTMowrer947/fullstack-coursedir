import { rest } from 'msw';
import { apiBaseUrl } from '../../config.ts';

export const getUser = rest.get(`${apiBaseUrl}/api/users`, (_req, res, ctx) => {
  return res(ctx.status(503));
});

export const newUser = rest.post(`${apiBaseUrl}/api/users`, (_req, res, ctx) => {
  return res(ctx.status(503));
});
