// Imports
import { Formik, FormikActions } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

// Form Values
export interface SignUpFormValues {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
}

// Prop Types
interface PropTypes {
    onSubmit: (
        values: SignUpFormValues,
        formikActions: FormikActions<SignUpFormValues>
    ) => void;
}

// Form Component
const SignUpForm: React.FC<PropTypes> = () => {
    // Define initial values
    const initialValues: SignUpFormValues = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
    };

    return (
        <Form noValidate method="POST">
            <Form.Group>
                <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Email Address"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
            </Form.Group>
            <Form.Group>
                <Button className="mr-3" variant="primary" type="submit">
                    Sign Up
                </Button>
                <LinkContainer exact to="/">
                    <Button variant="outline-primary">Cancel</Button>
                </LinkContainer>
            </Form.Group>
        </Form>
    );
};

// Export
export default SignUpForm;
