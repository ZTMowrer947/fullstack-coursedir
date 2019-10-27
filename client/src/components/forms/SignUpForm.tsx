// Imports
import { Formik, FormikActions } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CreateUserDTO from "../../models/CreateUserDTO";

// Form values
interface SignUpFormValues extends CreateUserDTO {
    confirmPassword: string;
}

// Prop Types
interface PropTypes {
    onSubmit: (
        values: SignUpFormValues,
        formikActions: FormikActions<SignUpFormValues>
    ) => void;
}

// Validation Schema
const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    emailAddress: Yup.string()
        .email("Email Address must be in the form of a valid email address.")
        .required("Email Address is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters in length.")
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password"), null],
            "Password and Confirm Password fields must match."
        )
        .required("Password Confirmation is required."),
});

// Component
const SignUpForm: React.FC<PropTypes> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                emailAddress: "",
                password: "",
                confirmPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={SignUpSchema}
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
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
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
                        <Form.Control
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <button
                            className="button"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Sign Up
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
export default SignUpForm;
