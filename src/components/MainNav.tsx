import { Link, useAsyncValue } from 'react-router-dom';

import { User } from '@/queries/getUser.ts';

import styles from './MainNav.module.css';

interface MainNavProps {
  onSignOut(): void;
}

export default function MainNav({ onSignOut }: MainNavProps) {
  const user = useAsyncValue() as User | null;

  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <span>Welcome {`${user.firstName} ${user.lastName}`}!</span>
          <button className={styles.link} onClick={onSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link className={styles.link} to={`signin`}>
            Sign in
          </Link>
          <Link className={styles.link} to={`signup`}>
            Sign up
          </Link>
        </>
      )}
    </nav>
  );
}
