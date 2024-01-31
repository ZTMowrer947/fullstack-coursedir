import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <nav>
        {/* TODO: Change to greetings and signout message when logged in */}
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </header>
  );
}
