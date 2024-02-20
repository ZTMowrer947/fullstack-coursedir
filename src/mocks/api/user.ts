import { http, HttpResponse, RequestHandler, StrictResponse } from 'msw';
import { ValidationError } from 'yup';

import { User } from '@/entities/user.ts';
import { NewUserData, userSchema } from '@/lib/mutations/newUser.ts';

import ensureAuth from './auth.ts';
import db from './db.ts';

const userHandlers: RequestHandler[] = [
  http.get('/api/user', ({ request }): StrictResponse<{ message: string } | User> => {
    const authResult = ensureAuth(request.headers.get('authorization'));

    if (authResult instanceof Response) return authResult;

    const user = authResult;

    // Extract only the desired properties of the user
    const userData: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    };

    return HttpResponse.json(userData);
  }),

  http.post('/api/user', async ({ request }): Promise<StrictResponse<NewUserData | ValidationError>> => {
    const userData = await request.json();

    let result: NewUserData;

    try {
      result = await userSchema.validate(userData, { abortEarly: false });
    } catch (err) {
      const validationErrors = err as ValidationError;

      return HttpResponse.json(validationErrors, { status: 400 });
    }

    const existingUserWithEmail = db.user.findFirst({
      where: {
        emailAddress: {
          equals: result.emailAddress,
        },
      },
    });

    if (existingUserWithEmail) {
      const error = new ValidationError('email already in use', result, 'emailAddress');
      return HttpResponse.json(error, { status: 400 });
    }

    db.user.create(result);

    return HttpResponse.json(result);
  }),
];

export default userHandlers;
