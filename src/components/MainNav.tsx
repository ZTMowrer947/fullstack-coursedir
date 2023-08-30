import { Link } from 'react-router-dom';

import { User } from '../queries/getUser.ts';
import styles from './MainNav.module.css';

interface MainNavProps {
  isReady: boolean;
  user: User | null;
}

export default function MainNav({ isReady, user }: MainNavProps) {
  return (
    <nav className={styles.nav}>
      {isReady &&
        (user ? (
          <>
            <span>Welcome {`${user.firstName} ${user.lastName}`}!</span>
            <button className={styles.link}>Sign Out</button>
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
        ))}
    </nav>
  );
}
