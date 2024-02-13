import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';
import { ValidationError } from 'yup';

import createNewUser from '@/lib/mutations/newUser';
import { userInfoQuery } from '@/lib/queries/userInfo';

type FormErrorResult = {
  error: ValidationError;
  timestamp: number;
};

export type SignUpActionResult = FormErrorResult | Response | undefined;

export function isFormError(val: unknown): val is FormErrorResult {
  return !!val && typeof val === 'object' && 'error' in val && 'timestamp' in val;
}

const signUpAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs): Promise<NonNullable<SignUpActionResult>> => {
    const data = await request.json();

    // Attempt to create new user
    let newUser: Awaited<ReturnType<typeof createNewUser>>;
    try {
      newUser = await createNewUser(data);
    } catch (err) {
      // If validation failed, return them to the action caller
      if (err instanceof ValidationError || (err as Error).name === 'ValidationError') {
        return {
          error: err as ValidationError,
          timestamp: Date.now(),
        };
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

    Cookies.set('sdbc-credentials', btoa(`${data.emailAddress}:${data.password}`), {
      sameSite: 'strict',
      expires: 7,
      secure: import.meta.env.PROD,
    });

    // Redirect to courses page
    return redirect('/courses');
  };

export default signUpAction;
