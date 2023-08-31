import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import btnStyles from '@/buttons.module.css';
import formStyles from '@/form.module.css';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className="grid grid-cols-6">
      <form className={formStyles.authForm} onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="firstName">
            First Name
          </label>
          <input className={formStyles.field} id="firstName" placeholder="First Name" {...register('firstName')} />
        </div>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="lastName">
            Last Name
          </label>
          <input className={formStyles.field} id="lastName" placeholder="Last Name" {...register('lastName')} />
        </div>
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
        </div>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={formStyles.field}
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
        </div>
        <div>
          <button type="submit" className={btnStyles.primary}>
            Sign Up
          </button>
          <Link to="/courses" className={btnStyles.secondary}>
            Cancel
          </Link>
        </div>

        <p>
          Already have a user account? <Link to="/signin">Click here</Link> to sign in.
        </p>
      </form>
    </div>
  );
}
