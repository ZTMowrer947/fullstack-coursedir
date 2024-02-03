import { QueryClient } from '@tanstack/react-query';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';
import { ValidationError } from 'yup';

import createNewUser from '@/lib/mutations/newUser';
import { userInfoQuery } from '@/lib/queries/userInfo';

const signUpAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const data = await request.json();

    // Attempt to create new user
    let newUser: Awaited<ReturnType<typeof createNewUser>>;
    try {
      newUser = await createNewUser(data);
    } catch (err) {
      // If validation failed, throw a 400 error
      if (err instanceof ValidationError || (err as Error).name === 'ValidationError') {
        throw json(
          { message: 'error during validation', error: err },
          {
            status: 400,
          },
        );
      }

      // Any other error is unexpected, throw a 500 error if we get one
      throw json(
        {
          message: 'Unexpected error during user creation',
          error: err,
        },
        { status: 500 },
      );
    }

    // Persist new user into query cache
    const userQueryKey = userInfoQuery({ emailAddress: data.emailAddress, password: data.password }).queryKey;

    queryClient.setQueryData(userQueryKey, newUser);

    // TODO: Also persist credentials in cookie data

    // Redirect to courses page
    return redirect('/courses');
  };

export default signUpAction;
