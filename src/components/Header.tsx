import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Await, useLoaderData, useRevalidator } from 'react-router-dom';

import { signOut, User } from '@/routes/loader.ts';

import styles from './Header.module.css';
import MainNav from './MainNav.tsx';

export default function Header() {
  const queryClient = useQueryClient();
  const data = useLoaderData() as { user: Promise<User | null> };
  const revalidator = useRevalidator();

  const handleSignOut = () => {
    signOut(queryClient);
    revalidator.revalidate();
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Courses</h1>

      <Suspense>
        <Await resolve={data.user}>
          <MainNav onSignOut={handleSignOut} />
        </Await>
      </Suspense>
    </header>
  );
}
