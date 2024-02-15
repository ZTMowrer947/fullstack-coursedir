import { LoaderFunction, redirect } from 'react-router-dom';

import { AuthManager } from '@/lib/auth-manager.ts';

const guestLoader: LoaderFunction = () => {
  if (!AuthManager.credentials) return null;

  return redirect('/courses');
};

export default guestLoader;
