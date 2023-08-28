import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Courses</h1>

      <nav className={styles.nav}>
        <Link to={`signin`}>Sign in</Link>
        <Link to={`signup`}>Sign up</Link>
      </nav>
    </header>
  );
}
