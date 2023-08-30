import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import btnStyles from '../buttons.module.css';
import formStyles from '../form.module.css';
import getUser from '../queries/getUser.ts';
import styles from './SignIn.module.css';

interface SignInFormData {
  emailAddress: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SignInFormData>();

  const [wasSigninSuccessful, setSigninSuccessful] = useState(false);

  const onSubmit = handleSubmit(async ({ emailAddress, password }) => {
    const user = await getUser(emailAddress, password);

    if (user) {
      // TODO: Persist user data for session
      console.log(user);

      navigate('/courses');
    } else {
      setSigninSuccessful(false);
    }
  });

  return (
    <div className="grid grid-cols-6">
      <form className={styles.form} onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="emailAddress">
            Email Address
          </label>
          <input
            className={formStyles.field}
            type="email"
            id="emailAddress"
            placeholder="Email Address"
            {...register('emailAddress')}
          />
        </div>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="password">
            Password
          </label>
          <input
            className={formStyles.field}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
          />
          {!wasSigninSuccessful && !formState.isSubmitting && formState.isSubmitted && (
            <p>Incorrect email/password combination.</p>
          )}
        </div>
        <div>
          <button type="submit" className={btnStyles.primary}>
            Sign In
          </button>
          <Link to="/courses" className={btnStyles.secondary}>
            Cancel
          </Link>
        </div>

        <p>
          Don&apos;t have a user account? <Link to="/signup">Click here</Link> to sign up.
        </p>
      </form>
    </div>
  );
}
