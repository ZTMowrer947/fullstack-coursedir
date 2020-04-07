// Imports
import React, { useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';

import SignInForm, { SignInFormValues } from '../forms/SignInForm';
import AuthContext from '../../context/AuthContext';
import { FormikActions } from 'formik';
import { InvalidCredentialsError } from '../../models/errors';

// Component
const UserSignIn: React.FC<RouteComponentProps> = ({ history }) => {
    // Connect to AuthContext
    const context = useContext(AuthContext);

    // Initialize state
    const [error, setError] = useState<Error | null>(null);

    // Define submit function
    const handleSubmit = (
        { emailAddress, password }: SignInFormValues,
        { setFieldError, setSubmitting }: FormikActions<SignInFormValues>
    ) => {
        context
            .signIn(emailAddress, password)
            .catch(error => {
                // If error is an InvalidCredentialsError,
                if (error instanceof InvalidCredentialsError) {
                    // Attach incorrect credentials error to form
                    setFieldError(
                        'password',
                        'Incorrect email/password combination.'
                    );
                }
                // Otherwise, attach error to state to be thrown later
                else {
                    setError(error);
                }
            })
            .finally(() => {
                // In any case, stop submission
                setSubmitting(false);
            });
    };

    // If an error has occurred, throw it
    if (error) throw error;

    // If user is already signed in,
    if (context.user)
        // Redirect to home page
        return <Redirect to="/" />;

    // Otherwise, render signin form
    return (
        <Row>
            <Col xs={2} md={3} lg={4} />
            <Col xs={8} md={6} lg={4}>
                <h1>Sign In</h1>
                <SignInForm onSubmit={handleSubmit} />
                <p>&nbsp;</p>
                <p>
                    Don't have a user account?&nbsp;
                    <Link to="/signup">Click here</Link> to sign up!
                </p>
            </Col>
            <Col xs={2} md={3} lg={4} />
        </Row>
    );
};

// Export
export default UserSignIn;
