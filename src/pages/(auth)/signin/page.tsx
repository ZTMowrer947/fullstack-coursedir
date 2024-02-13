import { FormEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useActionData, useSubmit } from 'react-router-dom';

import type { UserCredentials } from '@/entities/user.ts';
import { isInvalidCredentialsResponse, SignInActionResult } from '@/pages/(auth)/signin/action.tsx';

type SignInFormData = UserCredentials;

export default function SigninPage() {
  const actionResult = useActionData() as SignInActionResult;
  const [submitTimestamp, setSubmitTimestamp] = useState(-1);
  const submit = useSubmit();
  const { register, trigger, getValues } = useForm<SignInFormData>();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    // Perform form validation
    const isValid = await trigger();
    event.preventDefault();

    // If validation succeeded, proceed with submission
    if (isValid) {
      setSubmitTimestamp(Date.now());

      // Send form data to action as JSON
      const data = getValues();

      submit(JSON.stringify(data), {
        method: 'post',
        encType: 'application/json',
      });
    }
  };

  return (
    <form action="#" method="post" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="emailAddress">Email Address</label>
        <input type="email" id="emailAddress" placeholder="Email Address..." {...register('emailAddress')} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password..." {...register('password')} />
        {isInvalidCredentialsResponse(actionResult) && actionResult.timestamp >= submitTimestamp && (
          <p role="alert">Incorrect email/password combination.</p>
        )}
      </div>
      <div>
        <button type="submit">Submit</button>
        <Link to="/courses">Cancel</Link>
        <Link to="/signup">Create a new account</Link>
      </div>
    </form>
  );
}
