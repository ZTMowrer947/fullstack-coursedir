import { apiBaseUrl } from '../config.ts';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export default async function getUser(emailAddress: string, password: string): Promise<User | null> {
  const authToken = btoa(`${emailAddress}:${password}`);

  const res = await fetch(`${apiBaseUrl}/api/users`, {
    headers: {
      authorization: `Basic ${authToken}`,
    },
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 401) {
    return null;
  }

  throw new Error('Unexpected error while fetching user');
}
