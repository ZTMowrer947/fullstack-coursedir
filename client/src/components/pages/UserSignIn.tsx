// Imports
import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import SignInForm from '../forms/SignInForm';
import AuthContext from '../../context/AuthContext';

// Component
const UserSignIn: React.FC<RouteComponentProps> = ({ history }) => {
    // Connect to AuthContext
    const context = useContext(AuthContext);

    // If user is already signed in,
    if (context.user) {
        // Redirect to home page
        return <Redirect to="/" />;
    }
    // Otherwise, render signin form
    else {
        return (
            <Row>
                <Col xs={2} md={3} lg={4} />
                <Col xs={8} md={6} lg={4}>
                    <h1>Sign In</h1>
                    <SignInForm />
                </Col>
                <Col xs={2} md={3} lg={4} />
            </Row>
        );
    }
};

// Export
export default UserSignIn;
