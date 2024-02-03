import { http, HttpResponse, RequestHandler, StrictResponse } from 'msw';
import { ValidationError } from 'yup';

import { User } from '../../entities/user';
import { NewUserData, userSchema } from '../../lib/mutations/newUser';
import db from './db';

const userHandlers: RequestHandler[] = [
  http.get('/api/user', ({ request }): StrictResponse<{ message: string } | User> => {
    const authHeader = request.headers.get('authorization');
    const hdrRegex = /^Basic (?<credentials>[A-Za-z0-9+/=]+)$/;

    // Ensure Basic auth is being used
    if (!authHeader?.startsWith('Basic')) {
      return HttpResponse.json(
        { message: 'Auth not provided' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    const result = hdrRegex.exec(authHeader);

    // Ensure credentials exist within header
    if (!result?.groups?.credentials) {
      return HttpResponse.json(
        { message: 'Invalid auth type provided' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    // Decode credentials
    const credStr = atob(result.groups.credentials);
    const credParts = credStr.split(':');

    // If credentials are not in proper format, return 401
    if (credParts.length < 2) {
      return HttpResponse.json(
        { message: 'Invalid credential format' },
        {
          status: 401,
          headers: {
            'www-authenticate': 'Basic',
          },
        },
      );
    }

    // Extract email and password from credentials
    const [emailAddress, ...rest] = credParts;
    const password = rest.join(':'); // To account for a password containing a colon

    // Attempt to find user with credentials
    const user = db.user.findFirst({
      where: {
        emailAddress: {
          equals: emailAddress,
        },
        password: {
          equals: password,
        },
      },
    });

    // If not found, return 401
    if (!user) {
      return HttpResponse.json({ message: 'Incorrect credentials ' }, { status: 401 });
    }

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
      return HttpResponse.json(error, { status: 401 });
    }

    db.user.create(result);

    return HttpResponse.json(result);
  }),
];

export default userHandlers;
