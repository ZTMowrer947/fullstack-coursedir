// Imports
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';
import SignInForm, { SignInFormValues } from './SignInForm';
import { StaticRouter } from 'react-router-dom';

// Test Suite
describe('SignInForm component', () => {
    it('should initialize form fields correctly', () => {
        // Render component
        const { getByPlaceholderText } = render(
            <StaticRouter>
                <SignInForm onSubmit={() => {}} />
            </StaticRouter>
        );

        // Get form fields
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');

        // Expect form fields to have empty string value initially
        expect(emailAddrField).toHaveValue('');
        expect(passwordField).toHaveValue('');
    });

    it('should call the submit handler passed by props when form is submitted with form values', done => {
        // Generate random email address and password
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password(16);

        // Define submit handler
        const handleSubmit = ({ emailAddress, password }: SignInFormValues) => {
            // Expect form values to match input data
            expect(emailAddress).toBe(fakeEmail);
            expect(password).toBe(fakePassword);

            // Complete test
            done();
        };

        // Render component
        const { getByPlaceholderText, getByText } = render(
            <StaticRouter>
                <SignInForm onSubmit={handleSubmit} />
            </StaticRouter>
        );

        // Get form and form fields
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('Sign In');

        // Type fake data into form fields
        userEvent.type(emailAddrField, fakeEmail);
        userEvent.type(passwordField, fakePassword);

        // Submit form
        userEvent.click(submitButton);
    });
});
