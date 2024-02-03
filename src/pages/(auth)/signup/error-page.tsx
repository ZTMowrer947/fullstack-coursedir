import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import type { ValidationError } from 'yup';

import SignupPage from './page';

export default function SignUpFail() {
  const error = useRouteError();

  // If a validation error occurred, re-render form with errors and input values
  if (isRouteErrorResponse(error) && error.status === 400) {
    const midError = error.data as { message: string; error: ValidationError };

    return <SignupPage validationErrors={midError.error} />;
  }

  // Rethrow all other error types
  throw error;
}
