import { useEffect } from 'react';
import { useForm, Validate } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';
import { ValidationError } from 'yup';

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
  const submit = useSubmit();
  const serverErrors = useActionData() as ValidationError | undefined;
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>();

  const ensureMatchingPassword: Validate<string, SignUpFormData> = (confirmPassword: string) => {
    const password = getValues('password');

    return password === confirmPassword;
  };

  const onSubmit = handleSubmit(({ firstName, lastName, emailAddress, password }) => {
    submit(
      {
        firstName,
        lastName,
        emailAddress,
        password,
      },
      {
        method: 'post',
        encType: 'application/json',
      },
    );
  });

  useEffect(() => {
    if (serverErrors) {
      serverErrors.inner.forEach((error) => {
        let type = error.type!;

        if (error.path && error.path in getValues()) {
          const key = error.path as keyof SignUpFormData;

          if (type === 'min') type = 'minLength';

          if (!errors[key]) {
            setError(`root.${key}`, { type, message: error.message });
          }
        }
      });
    }
  }, [serverErrors, errors, setError, getValues]);

  const hasClientOrServerError = (key: keyof SignUpFormData, type: string) => {
    return errors?.[key]?.type === type || errors?.root?.[key]?.type === type;
  };

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
          {hasClientOrServerError('firstName', 'required') && <p role="alert">First name is required</p>}
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
          {hasClientOrServerError('lastName', 'required') && <p role="alert">Last name is required</p>}
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
          {hasClientOrServerError('emailAddress', 'required') && <p role="alert">Email Address is required</p>}
          {errors?.root?.emailAddress?.type === 'unique' && <p role="alert">Email Address already in use</p>}
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
          {hasClientOrServerError('password', 'required') && <p role="alert">Password is required</p>}
          {hasClientOrServerError('password', 'minLength') && (
            <p role="alert">Password must be at least 8 characters long</p>
          )}
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
