import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { defer, LoaderFunction } from 'react-router-dom';

import { apiBaseUrl } from '@/config.ts';

const credentialCookieName = 'sdbc-credentials';
const credentialCookieOptions: Cookies.CookieAttributes = {
  sameSite: 'strict',
  secure: import.meta.env.PROD && window.isSecureContext,
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

function getCredentials() {
  return Cookies.get(credentialCookieName);
}

const queryKey = ['user'];
export const authQuery = (credentials: string) => {
  return {
    queryKey,
    queryFn: async (): Promise<User> => {
      const res = await fetch(`${apiBaseUrl}/api/users`, {
        headers: {
          authorization: `Basic ${credentials}`,
        },
      });

      if (res.ok) {
        return await res.json();
      } else if (res.status === 401) {
        throw new Error('Incorrect email/password combination');
      }

      throw new Error('Unexpected error while fetching user');
    },
  };
};

export async function signIn(queryClient: QueryClient, credentials: string): Promise<User | null> {
  const query = authQuery(credentials);

  try {
    const user = await queryClient.fetchQuery(query);

    Cookies.set(credentialCookieName, credentials, credentialCookieOptions);

    return user;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('Incorrect email/password combination')) {
      throw error;
    }

    return null;
  }
}

export function signOut(queryClient: QueryClient) {
  Cookies.remove(credentialCookieName, credentialCookieOptions);
  queryClient.setQueryData(queryKey, null);
}

export default function authLoader(queryClient: QueryClient): LoaderFunction {
  return async () => {
    const credentials = getCredentials();

    if (!credentials) {
      return defer({
        user: null,
      });
    }

    const query = authQuery(credentials);
    const user = queryClient.ensureQueryData(query.queryKey, query.queryFn, {
      retry: 3,
    });

    return defer({ user });
  };
}
