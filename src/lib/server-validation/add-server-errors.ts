import { FieldValues, Path, useForm } from 'react-hook-form';
import { ValidationError } from 'yup';

export default function addServerErrors<Data extends FieldValues>(
  error: ValidationError,
  setError: ReturnType<typeof useForm<Data>>['setError'],
) {
  if (error.inner.length === 0) {
    setError(error.path as Path<Data>, {
      type: error.type ? `server-${error.type}` : 'server',
      message: error.message,
    });
  }

  const { inner: errors } = error;

  errors.forEach((error) => {
    setError(error.path as Path<Data>, {
      type: error.type ? `server-${error.type}` : 'server',
      message: error.message,
    });
  });
}
