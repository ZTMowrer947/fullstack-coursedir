import type { QueryClient } from '@tanstack/react-query';
import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';

import type { User } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import { userInfoQuery } from '@/lib/queries/userInfo.ts';

export interface EnsureAuthOptions {
  requestedUri: string;
  queryClient: QueryClient;
}

async function ensureAuth({ queryClient, requestedUri }: EnsureAuthOptions) {
  const credentials = AuthManager.credentials;

  // If there are no credentials stored, redirect to signin page
  if (!credentials) {
    return redirect(`/signin?return_to=${encodeURIComponent(requestedUri)}`);
  }

  // Fetch user using credentials
  const query = userInfoQuery(credentials);

  const user = await queryClient.ensureQueryData(query);

  // If no user was found with credentials, redirect to signin page
  if (!user) {
    AuthManager.clearCredentials();

    return redirect(`/signin?return_to=${encodeURIComponent(requestedUri)}`);
  }

  return user;
}

export type InnerLoader<Context = unknown> = (queryClient: QueryClient, user: User) => LoaderFunction<Context>;
export type InnerAction<Context = unknown> = (queryClient: QueryClient, user: User) => ActionFunction<Context>;

export function authLoaderWrapper(queryClient: QueryClient, innerLoader: InnerLoader): LoaderFunction {
  return async ({ request }) => {
    // Check if user is authenticated
    const authResult = await ensureAuth({
      queryClient,
      requestedUri: new URL(request.url).pathname,
    });

    if (authResult instanceof Response) {
      return authResult;
    }

    // Pass on user data to inner loader
    return innerLoader(queryClient, authResult);
  };
}

export function authActionWrapper(queryClient: QueryClient, innerAction: InnerAction): ActionFunction {
  return async ({ request }) => {
    // Check if user is authenticated
    const authResult = await ensureAuth({
      queryClient,
      requestedUri: new URL(request.url).pathname,
    });

    if (authResult instanceof Response) {
      return authResult;
    }

    // Pass user data to inner action
    return innerAction(queryClient, authResult);
  };
}
