// Imports
import { FormikActions, FormikErrors } from 'formik';
import React, { useCallback, useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import SignUpForm, { SignUpFormValues } from '../forms/SignUpForm';
import UserDTO from '../../models/UserDTO';
import { EmailInUseError, ServerValidationError } from '../../models/errors';
import UserApi from '../../services/UserApi';

// Location state
interface PrevUrlState {
    prevUrl?: string;
}

// Components
const UserSignUp: React.FC<RouteComponentProps<{}, {}, PrevUrlState>> = ({
    location,
}) => {
    // Get user data and signin function from AuthContext
    const { user, signIn } = useContext(AuthContext);

    // Initialize state
    const [error, setError] = useState<Error | null>(null);

    // Define signUp function
    const signUp = useCallback(
        async (userData: UserDTO) => {
            // Sign up using API
            await UserApi.signUp(userData);

            // Sign in with new user
            signIn(userData.emailAddress, userData.password);
        },
        [signIn]
    );

    // Define submit handler
    const handleSubmit = useCallback(
        (
            formData: SignUpFormValues,
            {
                setFieldError,
                setErrors,
                setSubmitting,
            }: FormikActions<SignUpFormValues>
        ) => {
            // Check that password confirmation is correct
            if (formData.password !== formData.confirmPassword) {
                // Abort submission if passwords do not match
                return setFieldError(
                    'confirmPassword',
                    'Passwords do not match.'
                );
            }

            // Extract user data that will be used for submission
            const { confirmPassword, ...userData } = formData;

            // Sign up user using data
            signUp(userData)
                .catch(error => {
                    // If error is an EmailInUseError,
                    if (error instanceof EmailInUseError) {
                        // Attach error to email field
                        setFieldError('emailAddress', error.message);
                    }
                    // If it is a ValidationError,
                    else if (error instanceof ServerValidationError) {
                        // Map errors to format expected by formik
                        const formikErrors = error.errors.reduce<
                            FormikErrors<SignUpFormValues>
                        >((acc, error) => {
                            // Get all constraints for error
                            const constraints = Object.values(
                                error.constraints
                            );

                            // Display isNotEmpty constraint if present, or first constraint otherwise.
                            const constraintToDisplay =
                                constraints.find(constraint =>
                                    constraint.includes('required')
                                ) ?? constraints[0];

                            // Adjust field names for display
                            const finalErrorMessage = constraintToDisplay
                                .replace('firstName', 'First Name')
                                .replace('lastName', 'Last Name')
                                .replace('emailAddress', 'Email Address')
                                .replace('password', 'Password');

                            // Append error for field to validation error map
                            return {
                                ...acc,
                                [error.property]: finalErrorMessage,
                            };
                        }, {});

                        // Set validation errors for form
                        setErrors(formikErrors);
                    }
                    // Otherwise, attach error to state to be thrown later
                    else {
                        setError(error);
                    }
                })
                .finally(() => {
                    // In any case, complete submission
                    setSubmitting(false);
                });
        },
        [signUp]
    );

    // If an error has occurred, throw it
    if (error) throw error;

    // If a user is signed in,
    if (user) {
        // Determine redirection url
        const prevUrl = location.state?.prevUrl ?? '/';

        // Redirect to URL
        return <Redirect to={prevUrl} />;
    }

    // Otherwise, render form
    return (
        <Row>
            <Col xs={2} md={3} lg={4} />
            <Col xs={8} md={6} lg={4}>
                <h1>Sign Up</h1>
                <SignUpForm onSubmit={handleSubmit} />
                <p>&nbsp;</p>
                <p>
                    Already have a user account?{' '}
                    <Link
                        to={{
                            pathname: '/signin',
                            state: { prevUrl: location.state?.prevUrl },
                        }}
                    >
                        Click here
                    </Link>{' '}
                    to sign in!
                </p>
            </Col>
            <Col xs={2} md={3} lg={4} />
        </Row>
    );
};

// Export
export default UserSignUp;
