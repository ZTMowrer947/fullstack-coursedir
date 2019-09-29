// Imports
import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignInForm from "../forms/SignInForm";
import { AxiosError } from "axios";

// Components
const UserSignIn: React.FC<RouteComponentProps> = ({ history }) => {
    // Get data from AuthContext
    const { user, signIn } = useContext(AuthContext);

    // If a user is already signed in,
    if (user) {
        // Redirect to home page
        return <Redirect to="/" />;
    }

    // Otherwise, render form
    return (
        <Row className="bounds d-flex flex-column align-items-center">
            <Col xs={8} md={6} lg={4} className="signin d-flex flex-column">
                <h1>Sign In</h1>
                <div>
                    <SignInForm
                        onSubmit={(
                            { emailAddress, password },
                            { setFieldError, setSubmitting }
                        ) => {
                            signIn(emailAddress, password)
                                .then(() => {
                                    setSubmitting(false);
                                })
                                .catch((error: AxiosError) => {
                                    setSubmitting(false);

                                    if (error.response) {
                                        let field = "emailAddress";

                                        if (error.response.status === 404) {
                                            field = "emailAddress";
                                        } else if (
                                            error.response.status === 401
                                        ) {
                                            field = "password";
                                        }

                                        setFieldError(
                                            field,
                                            error.response.data.message
                                        );
                                    }
                                });
                        }}
                    />
                </div>
                <p className="mt-5">
                    Don't have a user account?{" "}
                    <Link to="/signup">Click here</Link> to sign up!
                </p>
            </Col>
        </Row>
    );
};

// Export
export default UserSignIn;
