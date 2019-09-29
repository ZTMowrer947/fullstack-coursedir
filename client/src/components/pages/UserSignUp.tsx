// Imports
import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SignUpForm from "../forms/SignUpForm";

// Component
const UserSignUp: React.FC = () => {
    // Get user from AuthContext
    const { user } = useContext(AuthContext);

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
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false);
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
