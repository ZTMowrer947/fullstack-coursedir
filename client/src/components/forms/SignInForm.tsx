// Import
import { Formik, FormikActions } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

// Form values
export interface SignInFormValues {
    emailAddress: string;
    password: string;
}

// Prop Types
interface PropTypes {
    onSubmit: (
        values: SignInFormValues,
        formikActions: FormikActions<SignInFormValues>
    ) => void;
}

// Component
const SignInForm: React.FC<PropTypes> = ({ onSubmit }) => {
    // Define initial values
    const initialValues: SignInFormValues = {
        emailAddress: '',
        password: '',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({
                errors,
                isSubmitting,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="Email Address"
                            value={values.emailAddress}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                            className={errors.password ? 'd-block' : ''}
                        >
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            className="mr-3"
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Sign In
                        </Button>
                        <LinkContainer exact to="/">
                            <Button variant="outline-primary">Cancel</Button>
                        </LinkContainer>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default SignInForm;
