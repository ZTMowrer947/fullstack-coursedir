import { rest } from 'msw';

export const getUser = rest.get('http://localhost:3000/api/users', (_req, res, ctx) => {
  return res(ctx.status(503));
});
