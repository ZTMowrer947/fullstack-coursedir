import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <form action="#" method="post">
      <fieldset>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" placeholder="First Name..." />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" name="lastname" id="lastName" placeholder="Last Name..." />
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address</label>
          <input type="email" name="emailAddress" id="emailAddress" placeholder="Email Address..." />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password..." />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password..." />
        </div>
      </fieldset>
      <div>
        <button type="submit">Submit</button>
        <Link to="/courses">Cancel</Link>
        <Link to="/signin">Sign in with existing account</Link>
      </div>
    </form>
  );
}
