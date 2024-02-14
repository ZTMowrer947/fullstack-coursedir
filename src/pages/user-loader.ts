import { QueryClient } from '@tanstack/react-query';
import { defer } from 'react-router-dom';

import { User } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import { userInfoQuery } from '@/lib/queries/userInfo.ts';

const userLoader = (queryClient: QueryClient) => {
  return async () => {
    const credentials = AuthManager.credentials;

    // No credentials, no user
    if (!credentials) {
      return defer({
        user: null,
      });
    }

    const query = userInfoQuery(credentials);

    const queryResult = queryClient.ensureQueryData(query).then((user) => {
      // If the stored credentials were not valid, delete them
      if (credentials && !user) {
        AuthManager.clearCredentials();
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

export default userLoader;
