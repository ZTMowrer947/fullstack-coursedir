// Imports
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, RouteComponentProps } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignInForm from "../forms/SignInForm";
import { AxiosError } from "axios";

// Component
class UserSignIn extends React.PureComponent<RouteComponentProps> {
    // Context
    public static contextType = AuthContext;
    public context!: React.ContextType<typeof AuthContext>;

    public componentDidMount() {
        // If a user is already signed in,
        if (this.context.user) {
            // Redirect to home page
            this.props.history.push("/");
        }
    }

    public render() {
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
                                this.context
                                    .signIn(emailAddress, password)
                                    .then(() => {
                                        // If successful, stop submission
                                        setSubmitting(false);

                                        // Determine redirection path (prevUrl from location state if defined, home page otherwise)
                                        const prevUrl =
                                            (this.props.location.state &&
                                                this.props.location.state
                                                    .prevUrl) ||
                                            "/";

                                        // Redirect to selected path
                                        this.props.history.push(prevUrl);
                                    })
                                    .catch((error: AxiosError) => {
                                        // If an error occurred, stop submission
                                        setSubmitting(false);

                                        // If a response is attached
                                        if (error.response) {
                                            // Determine field to set error on
                                            let field = "emailAddress";

                                            if (error.response.status === 404) {
                                                field = "emailAddress";
                                            } else if (
                                                error.response.status === 401
                                            ) {
                                                field = "password";
                                            }

                                            // Set error on selected field
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
    }
}

// Export
export default UserSignIn;
