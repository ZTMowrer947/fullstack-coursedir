import { rest } from 'msw';

import { apiBaseUrl } from '../../config.ts';
import { getMockUser } from '../mockDb.ts';

export const getUser = rest.get(`${apiBaseUrl}/api/users`, (req, res, ctx) => {
  if (!req.headers.has('authorization') || !req.headers.get('authorization')?.startsWith('Basic')) {
    return res(ctx.set('www-authenticate', 'Basic'), ctx.status(401));
  }

  const token = req.headers.get('authorization')!.replace('Basic ', '');

  const [emailAddress, reqPassword] = atob(token).split(':');

  const user = getMockUser(emailAddress);

  if (user?.password !== reqPassword) {
    return res(ctx.status(401));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...outputUser } = user;

  return res(ctx.status(200), ctx.json(outputUser));
});

export const newUser = rest.post(`${apiBaseUrl}/api/users`, (_req, res, ctx) => {
  return res(ctx.status(503));
});
