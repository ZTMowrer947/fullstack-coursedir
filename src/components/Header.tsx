import { useEffect, useState } from 'react';

import User from '../../old/src/models/User.ts';
import authManager from '../lib/authManager.ts';
import styles from './Header.module.css';
import MainNav from './MainNav.tsx';

export default function Header() {
  const [isNavReady, setNavReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isNavReady) {
      if (!user && authManager.hasCredentials) {
        authManager.signInFromCookie().then((user) => {
          if (user) {
            setUser(user);
          }
          setNavReady(true);
        });
      } else {
        setNavReady(true);
      }
    }
  }, [user, isNavReady]);

  useEffect(() => {
    let timeoutId: number;

    function revalidateAuth() {
      if (!isNavReady) return;

      if (!authManager.hasCredentials && authManager.user) {
        authManager.signOut();
        setUser(null);
      } else if (authManager.hasCredentials && !authManager.user) {
        authManager.signInFromCookie().then(setUser);
      } else if (authManager.hasCredentials && !user) {
        setUser(authManager.user);
      }

      timeoutId = window.setTimeout(revalidateAuth, 250);
    }

    timeoutId = window.setTimeout(revalidateAuth, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isNavReady, user]);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Courses</h1>

      <MainNav isReady={isNavReady} user={user} />
    </header>
  );
}
