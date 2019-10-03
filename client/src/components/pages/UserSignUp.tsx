// Imports
import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignUpForm from "../forms/SignUpForm";
import { AxiosError } from "axios";

// Component
const UserSignUp: React.FC<RouteComponentProps> = () => {
    // Get user data and functions from AuthContext
    const { user, signIn, signUp } = useContext(AuthContext);

    // If a user is already signed in,
    if (user) {
        // Redirect to home page
        return <Redirect to="/" />;
    }

    // Otherwise, render form
    return (
        <Row className="bounds d-flex flex-column align-items-center">
            <Col xs={8} md={6} lg={4} className="signup d-flex flex-column">
                <h1>Sign Up</h1>
                <div>
                    <SignUpForm
                        onSubmit={(
                            values,
                            { setErrors, setFieldError, setSubmitting }
                        ) => {
                            // Attempt to sign up user
                            signUp(values)
                                .then(() => {
                                    // If successful, sign in user
                                    return signIn(
                                        values.emailAddress,
                                        values.password
                                    );
                                })
                                .catch((error: AxiosError) => {
                                    // If an error was thrown
                                    // If a response is attached, and the status code is 400,
                                    if (
                                        error.response &&
                                        error.response.status === 400
                                    ) {
                                        // If there are validation errors,
                                        if (error.response.data.errors) {
                                            // Map validation errors to the format expected by Formik
                                            const validationErrors = error.response.data.errors.reduce(
                                                (acc: object, error: any) => {
                                                    // Get "required" message if present, or else get first error message
                                                    const errorMessage: string =
                                                        error.constraints
                                                            .isNotEmpty ||
                                                        Object.values(
                                                            error.contraints
                                                        )[0];

                                                    return {
                                                        ...acc,
                                                        [error.property]: errorMessage
                                                            .replace(
                                                                "firstName",
                                                                "FirstName"
                                                            )
                                                            .replace(
                                                                "lastName",
                                                                "Last Name"
                                                            )
                                                            .replace(
                                                                "emailAddress",
                                                                "Email Address"
                                                            )
                                                            .replace(
                                                                "password",
                                                                "Password"
                                                            ),
                                                    };
                                                },
                                                {}
                                            );

                                            // Set validation errors for form fields
                                            setErrors(validationErrors);
                                        } else {
                                            // Otherwise, set validation error on email address
                                            setFieldError(
                                                "emailAddress",
                                                error.response.data.message
                                            );
                                        }
                                    }

                                    // Stop submission
                                    setSubmitting(false);
                                });
                        }}
                    />
                </div>
                <p className="mt-5">
                    Already have a user account?{" "}
                    <Link to="/signin">Click here</Link> to sign in!
                </p>
            </Col>
        </Row>
    );
};

// Export
export default UserSignUp;
