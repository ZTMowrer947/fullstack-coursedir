import { QueryClient } from '@tanstack/react-query';
import { ActionFunction } from 'react-router-dom';

import { AuthManager } from '@/lib/auth-manager.ts';

const signOutAction = (queryClient: QueryClient): ActionFunction => {
  return () => {
    AuthManager.clearCredentials();

    queryClient.removeQueries({ queryKey: ['user'], exact: true });

    return null;
  };
};

export default signOutAction;
