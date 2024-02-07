import { FormEventHandler, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';

import type { SignUpFormData } from '@/lib/mutations/newUser';
import addServerErrors from '@/lib/server-validation/add-server-errors.ts';
import { isFormError, SignUpActionResult } from '@/pages/(auth)/signup/action.tsx';

export default function SignupPage() {
  const actionResult = useActionData() as SignUpActionResult;
  const [submitTimestamp, setSubmitTimestamp] = useState(-1);
  const submit = useSubmit();
  const {
    register,
    trigger,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpFormData>({});

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // Perform form validation
    const isValid = await trigger();
    event.preventDefault();

    // If validation succeeded, proceed with submission
    if (isValid) {
      clearErrors();
      setSubmitTimestamp(Date.now());

      // Send form data to action as JSON
      const data = getValues();

      submit(JSON.stringify(data), {
        method: 'post',
        encType: 'application/json',
      });
    }
  };

  useEffect(() => {
    // If the server returned validation errors after our most recent submission,
    if (isFormError(actionResult) && actionResult.timestamp > submitTimestamp) {
      addServerErrors(actionResult.error, setError);
    }
  }, [actionResult, submitTimestamp, setError]);

  return (
    <form action="#" method="post" onSubmit={handleFormSubmit}>
      <fieldset>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="First Name..." {...register('firstName')} />
          {errors.firstName && <p role="alert">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastName" placeholder="Last Name..." {...register('lastName')} />
          {errors.lastName && <p role="alert">{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="emailAddress">Email Address</label>
          <input type="email" id="emailAddress" placeholder="Email Address..." {...register('emailAddress')} />
          {errors.emailAddress && <p role="alert">{errors.emailAddress.message}</p>}
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password..." {...register('password')} />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password..."
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
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
