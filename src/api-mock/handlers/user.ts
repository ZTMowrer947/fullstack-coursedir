import { rest } from 'msw';
import { InferType, object, string, ValidationError } from 'yup';

import { apiBaseUrl } from '@/config.ts';

import { addUser, getMockUser, userHasEmail } from '../mockDb.ts';

const UserSchema = object().shape({
  firstName: string().defined().required(),
  lastName: string().defined().required(),
  emailAddress: string()
    .defined()
    .required()
    .email()
    .test('unique', 'email already in use', (value) => !userHasEmail(value)),
  password: string().defined().required().min(8),
});

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

export const newUser = rest.post(`${apiBaseUrl}/api/users`, async (req, res, ctx) => {
  const data = await req.json();

  let user: InferType<typeof UserSchema>;
  try {
    user = await UserSchema.validate(data, {
      abortEarly: false,
    });
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;

    return res(ctx.status(400), ctx.json(error));
  }

  addUser(user);

  return res(ctx.status(201));
});
