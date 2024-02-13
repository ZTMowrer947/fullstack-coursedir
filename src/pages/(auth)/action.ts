import { QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ActionFunction } from 'react-router-dom';

const signOutAction = (queryClient: QueryClient): ActionFunction => {
  return () => {
    Cookies.remove('sdbc-credentials', {
      expires: 7,
      sameSite: 'strict',
      secure: import.meta.env.PROD,
    });

    queryClient.removeQueries({ queryKey: ['user'], exact: true });

    return null;
  };
};

export default signOutAction;
