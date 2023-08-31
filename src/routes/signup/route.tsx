import { useForm, Validate } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const ensureMatchingPassword: Validate<string, SignUpFormData> = (confirmPassword: string) => {
    const password = getValues('password');

    return password === confirmPassword;
  };

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
          <input
            className={formStyles.field}
            id="firstName"
            placeholder="First Name"
            {...register('firstName', {
              required: true,
            })}
          />
          {errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
        </div>
        <div className={formStyles.group}>
          <label className="hidden" htmlFor="lastName">
            Last Name
          </label>
          <input
            className={formStyles.field}
            id="lastName"
            placeholder="Last Name"
            {...register('lastName', {
              required: true,
            })}
          />
          {errors.lastName?.type === 'required' && <p role="alert">Last name is required</p>}
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
            {...register('emailAddress', {
              required: true,
            })}
          />
          {errors.emailAddress?.type === 'required' && <p role="alert">Email Address is required</p>}
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
            {...register('password', {
              required: true,
              minLength: 8,
              onChange() {
                return trigger('confirmPassword');
              },
            })}
          />
          {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
          {errors.password?.type === 'minLength' && <p role="alert">Password must be at least 8 characters long</p>}
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
            {...register('confirmPassword', {
              required: true,
              validate: {
                matchingPassword: ensureMatchingPassword,
              },
            })}
          />
          {errors.confirmPassword?.type === 'required' && <p role="alert">Password Confirmation is required</p>}
          {errors.confirmPassword?.type === 'matchingPassword' && <p role="alert">Passwords do not match</p>}
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
