// Imports
import { Formik, FormikActions } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import * as Yup from "yup";

// Form values
interface SignInFormValues {
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

// Validation Schema
const SignInSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .email("Email Address must be in the form of a valid email address.")
        .required("Email Address is required."),
    password: Yup.string().required("Password is required."),
});

// Component
const SignInForm: React.FC<PropTypes> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ emailAddress: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={SignInSchema}
            validateOnChange={false}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="emailAddress"
                            name="emailAddress"
                            placeholder="Email Address"
                            value={values.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.emailAddress}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.emailAddress}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <button
                            className="button"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Sign In
                        </button>
                        <Link to="/" className="button button-secondary">
                            Cancel
                        </Link>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default SignInForm;
