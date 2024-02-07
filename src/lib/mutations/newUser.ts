import { InferType, object, ref, string, ValidationError } from 'yup';

import { User } from '@/entities/user';

export const signUpSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  emailAddress: string().email().required(),
  password: string().required().min(8),
  confirmPassword: string()
    .required()
    .oneOf([ref('password')], 'password fields must match'),
});

export const userSchema = signUpSchema.omit(['confirmPassword']);

export type NewUserData = InferType<typeof userSchema>;
export type SignUpFormData = InferType<typeof signUpSchema>;

async function createNewUser(userData: NewUserData) {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (res.ok) {
    const newUserData = (await res.json()) as User;

    return newUserData;
  } else if (res.status == 400) {
    const error = (await res.json()) as ValidationError;

    throw error;
  } else {
    throw new Error('Unexpected failure creating new user');
  }
}

export default createNewUser;
