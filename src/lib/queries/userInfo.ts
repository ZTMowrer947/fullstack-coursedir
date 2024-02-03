import { User } from '@/entities/user';

export interface UserCredentials {
  emailAddress: string;
  password: string;
}

async function fetchUserInfo({ emailAddress, password }: UserCredentials): Promise<User | null> {
  const credentials = btoa(`${emailAddress}:${password}`);

  const res = await fetch('/api/users', {
    headers: {
      authorization: `Basic ${credentials}`,
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
