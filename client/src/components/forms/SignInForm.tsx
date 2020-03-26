// Import
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LinkContainer } from 'react-router-bootstrap';

// Component
const SignInForm: React.FC = () => (
    <Form noValidate method="POST">
        <Form.Group>
            <Form.Control
                type="text"
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
            <Button className="mr-3" variant="primary" type="submit">
                Sign In
            </Button>
            <LinkContainer exact to="/">
                <Button variant="outline-primary">Cancel</Button>
            </LinkContainer>
        </Form.Group>
    </Form>
);

// Export
export default SignInForm;
