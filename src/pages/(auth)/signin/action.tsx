import type { QueryClient } from '@tanstack/react-query';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

import type { UserCredentials } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import { userInfoQuery } from '@/lib/queries/userInfo.ts';

type SignInFailure = { valid: false; timestamp: number };

const signInAction =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const data = (await request.json()) as UserCredentials;

    const query = userInfoQuery(data);

    const user = await queryClient.fetchQuery(query);

    if (!user) {
      return {
        valid: false,
        timestamp: Date.now(),
      } as const;
    }

    AuthManager.storeCredentials(data);

    return redirect('/courses');
  };

export type SignInActionResult = Awaited<ReturnType<ReturnType<typeof signInAction>>> | undefined;

export function isInvalidCredentialsResponse(response: SignInActionResult): response is SignInFailure {
  return (
    typeof response !== 'undefined' &&
    'valid' in response &&
    !response.valid &&
    'timestamp' in response &&
    typeof response.timestamp === 'number'
  );
}

export default signInAction;
