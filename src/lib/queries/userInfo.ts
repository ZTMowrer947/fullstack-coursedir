import { User } from '@/entities/user';
import { AuthManager } from '@/lib/auth-manager.ts';

export interface UserCredentials {
  emailAddress: string;
  password: string;
}

async function fetchUserInfo(credentials: UserCredentials): Promise<User | null> {
  const encCredentials = AuthManager.encodeCredentials(credentials);

  const res = await fetch('/api/user', {
    headers: {
      authorization: `Basic ${encCredentials}`,
      accept: 'application/json',
    },
  });

  if (res.ok) {
    const user = await res.json();

    return user;
  } else if (res.status == 401) {
    return null;
  } else {
    throw new Error('Unexpected failure fetching user data');
  }
}

export default fetchUserInfo;

export function userInfoQuery(credentials: UserCredentials) {
  return {
    queryKey: ['user'] as const,
    queryFn: () => fetchUserInfo(credentials),
  };
}
