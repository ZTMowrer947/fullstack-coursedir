import { LoaderFunction, redirect } from 'react-router-dom';

import authManager from './authManager.ts';

const privateLoader: LoaderFunction = async () => {
  if (!authManager.hasCredentials) {
    return redirect('/signin');
  }

  if (!authManager.user) {
    await authManager.signInFromCookie();
  }

  return authManager.user;
};

export default privateLoader;
