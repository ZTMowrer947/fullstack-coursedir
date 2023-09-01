import { QueryClient } from '@tanstack/react-query';
import { ActionFunction, redirect } from 'react-router-dom';
import { ValidationError } from 'yup';

import { apiBaseUrl } from '@/config.ts';
import { signIn, User } from '@/routes/loader.ts';

type UserInput = Omit<User, 'id'> & {
  password: string;
};

const action = (queryClient: QueryClient): ActionFunction => {
  return async ({ request }) => {
    const data = (await request.json()) as UserInput;

    const res = await fetch(`${apiBaseUrl}/api/users`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const credentials = btoa(`${data.emailAddress}:${data.password}`);

      await signIn(queryClient, credentials);

      return redirect('/courses');
    } else if (res.status === 400) {
      return (await res.json()) as ValidationError;
    }

    throw new Error('Unexpected error while signing up');
  };
};

export default action;
