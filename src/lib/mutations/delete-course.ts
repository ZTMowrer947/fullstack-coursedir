import type { UserCredentials } from '@/entities/user.ts';
import { AuthManager } from '@/lib/auth-manager.ts';
import HttpError from '@/lib/errors/http.ts';

export default async function deleteCourse(credentials: UserCredentials, id: number) {
  const res = await fetch(`/api/courses/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Basic ${AuthManager.encodeCredentials(credentials)}`,
    },
  });

  if (!res.ok) {
    const message = (await res.json()).message;

    throw new HttpError(message, res.status);
  }
}
