import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ActionFunction } from 'react-router-dom';

import { credentialCookieName, credentialCookieOpts } from '@/lib/cookie/config.ts';

const signOutAction = (queryClient: QueryClient): ActionFunction => {
  return () => {
    Cookies.remove(credentialCookieName, credentialCookieOpts);

    queryClient.removeQueries({ queryKey: ['user'], exact: true });

    return null;
  };
};

export default signOutAction;
