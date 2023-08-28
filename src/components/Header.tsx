import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="bounds">
        <div className="header--logo">
          <h1>Courses</h1>
          <nav>
            <Link to={`signin`} className="signin">
              Sign in
            </Link>
            <Link to={`signup`} className="signup">
              Sign up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
