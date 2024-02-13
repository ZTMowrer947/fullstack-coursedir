import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { defer } from 'react-router-dom';

import { User } from '@/entities/user.ts';
import { userInfoQuery } from '@/lib/queries/userInfo.ts';

const authLoader = (queryClient: QueryClient) => {
  return async () => {
    const credentials = Cookies.get('sdbc-credentials');

    // No credentials, no user
    if (!credentials) {
      return defer({
        user: null,
      });
    }

    // Fetch user using credentials
    // TODO: Add more thorough validation of valid user credentials
    const [emailAddress, password] = atob(credentials).split(':');

    const query = userInfoQuery({ emailAddress, password });

    const queryResult = queryClient.ensureQueryData(query).then((user) => {
      // If the stored credentials were not valid, delete the associated cookie
      if (credentials && !user) {
        Cookies.remove('sdbc-credentials', {
          expires: 7,
          secure: import.meta.env.PROD,
          sameSite: 'strict',
        });
      }

      return user;
    });

    return defer({
      user: queryResult,
    });
  };
};

export type AuthLoaderData = {
  user: Promise<User | null>;
};

export default authLoader;
