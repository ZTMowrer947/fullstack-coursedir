import { Link } from 'react-router-dom';

export default function SigninPage() {
  return (
    <form action="#" method="post">
      <div>
        <label htmlFor="emailAddress">Email Address</label>
        <input type="email" name="emailAddress" id="emailAddress" placeholder="Email Address..." />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password..." />
      </div>
      <div>
        <button type="submit">Submit</button>
        <Link to="/courses">Cancel</Link>
        <Link to="/signup">Create a new account</Link>
      </div>
    </form>
  );
}
