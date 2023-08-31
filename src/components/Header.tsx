import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import { User } from '@/routes/loader.ts';

import styles from './Header.module.css';
import MainNav from './MainNav.tsx';

interface HeaderProps {
  signOut(): void;
}

export default function Header({ signOut }: HeaderProps) {
  const data = useLoaderData() as { user: Promise<User | null> };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Courses</h1>

      <Suspense>
        <Await resolve={data.user}>
          <MainNav onSignOut={signOut} />
        </Await>
      </Suspense>
    </header>
  );
}
