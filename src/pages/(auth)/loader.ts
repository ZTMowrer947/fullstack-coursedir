import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { defer } from 'react-router-dom';

import { User } from '@/entities/user.ts';
import { userInfoQuery } from '@/lib/queries/userInfo.ts';

const authLoader = (queryClient: QueryClient) => {
  return async () => {
    const credentials = Cookies.get('sdbc-credentials');

    if (!credentials) {
      return defer({
        user: null,
      });
    }

    // TODO: Add more thorough validation of valid user credentials
    const [emailAddress, password] = atob(credentials).split(':');

    const query = userInfoQuery({ emailAddress, password });

    return defer({
      user: queryClient.ensureQueryData(query),
    });
  };
};

export type AuthLoaderData = {
  user: Promise<User | null>;
};

export default authLoader;
