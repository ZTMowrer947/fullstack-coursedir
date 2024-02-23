import { HttpResponse } from 'msw';

import db from '@/mocks/api/db.ts';

export default function ensureAuth(authHeader: string | null) {
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

  // If not found, return 401, otherwise return user
  if (!user) {
    return HttpResponse.json({ message: 'Incorrect credentials ' }, { status: 401 });
  }

  return user;
}