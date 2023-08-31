import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useRevalidator } from 'react-router-dom';

import Header from '@/components/Header.tsx';
import { signIn, signOut, User } from '@/routes/loader.ts';

export interface AuthContext {
  signOut(): void;
  signIn(emailAddress: string, password: string): Promise<User | null>;
}

export default function Layout() {
  const queryClient = useQueryClient();
  const revalidator = useRevalidator();

  const authUtils: AuthContext = {
    signOut() {
      signOut(queryClient);
      revalidator.revalidate();
    },
    async signIn(emailAddress: string, password: string) {
      const credentials = btoa(`${emailAddress}:${password}`);

      const user = await signIn(queryClient, credentials);

      revalidator.revalidate();

      return user;
    },
  };

  return (
    <>
      <Header signOut={authUtils.signOut} />
      <main className="mx-20">
        <Outlet context={authUtils} />
      </main>
    </>
  );
}
