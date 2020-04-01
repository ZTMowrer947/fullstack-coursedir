// Imports
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import SignUpForm from './SignUpForm';

// Test Suite
describe('SignUpForm component', () => {
    it('should initialize form fields correctly', () => {
        // Render component
        const { getByPlaceholderText } = render(
            <StaticRouter>
                <SignUpForm onSubmit={() => {}} />
            </StaticRouter>
        );

        // Get form fields
        const firstNameField = getByPlaceholderText('First Name');
        const lastNameField = getByPlaceholderText('Last Name');
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const confirmPasswordField = getByPlaceholderText('Confirm Password');

        // Expect form fields to have empty string value initially
        expect(firstNameField).toHaveValue('');
        expect(lastNameField).toHaveValue('');
        expect(emailAddrField).toHaveValue('');
        expect(passwordField).toHaveValue('');
        expect(confirmPasswordField).toHaveValue('');
    });

    it('should correctly process client-side validation', async () => {
        // Define mock function for submit handler
        const handleSubmit = jest.fn();

        // Render component
        const {
            getByPlaceholderText,
            getByText,
            queryAllByText,
            queryByText,
        } = render(
            <StaticRouter>
                <SignUpForm onSubmit={handleSubmit} />
            </StaticRouter>
        );

        // Get form fields and submit button
        const firstNameField = getByPlaceholderText('First Name');
        const lastNameField = getByPlaceholderText('Last Name');
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const confirmPasswordField = getByPlaceholderText('Confirm Password');
        const submitButton = getByText('Sign Up');

        // Attempt to submit form
        userEvent.click(submitButton);

        // Wait until all form fields are invalid
        await wait(() => {
            expect(firstNameField).toHaveClass('is-invalid');
            expect(lastNameField).toHaveClass('is-invalid');
            expect(emailAddrField).toHaveClass('is-invalid');
            expect(passwordField).toHaveClass('is-invalid');
            expect(confirmPasswordField).toHaveClass('is-invalid');
        });

        // Expect submit handler to not be called
        expect(handleSubmit).not.toHaveBeenCalled();

        // Get "required" validation errors
        let requiredFieldErrors = queryAllByText(/is a required field\.$/);

        // Expect there to be 5 "required" validation errors, one for each field
        expect(requiredFieldErrors).toHaveLength(5);

        // Fill out first and last name
        userEvent.type(firstNameField, faker.name.firstName());
        userEvent.type(lastNameField, faker.name.lastName());

        // Fill out email address with something that isn't an email address
        userEvent.type(emailAddrField, faker.lorem.sentence());

        // Fill out password and confirmation fields with two different passwords
        userEvent.type(passwordField, faker.internet.password(16));
        userEvent.type(confirmPasswordField, faker.internet.password(16));

        // Attempt to submit form again
        userEvent.click(submitButton);

        // Wait until email and password confirmation fields are invalid
        await wait(() => {
            expect(firstNameField).not.toHaveClass('is-invalid');
            expect(lastNameField).not.toHaveClass('is-invalid');
            expect(emailAddrField).toHaveClass('is-invalid');
            expect(passwordField).not.toHaveClass('is-invalid');
            expect(confirmPasswordField).toHaveClass('is-invalid');
        });

        // Expect submit handler to still not be called
        expect(handleSubmit).not.toHaveBeenCalled();

        // Get "required" validation errors
        requiredFieldErrors = queryAllByText(/is a required field\.$/);

        // Expect there to be no such validation errors
        expect(requiredFieldErrors).toHaveLength(0);

        // Query for validation errors on email and password confirmation fields
        const emailValidationError = queryByText(
            'Email Address must be a valid email address.'
        );
        const confirmPassValidationError = queryByText(
            'Passwords do not match.'
        );

        // Expect both errors to be present in the document
        expect(emailValidationError).toBeInTheDocument();
        expect(confirmPassValidationError).toBeInTheDocument();

        // Clear both fields
        userEvent.type(
            emailAddrField,
            '\b'.repeat((emailAddrField as HTMLInputElement).value.length)
        );

        userEvent.type(
            confirmPasswordField,
            '\b'.repeat((confirmPasswordField as HTMLInputElement).value.length)
        );

        // Fill in proper values into both
        userEvent.type(emailAddrField, faker.internet.email());
        userEvent.type(
            confirmPasswordField,
            (passwordField as HTMLInputElement).value
        );

        // Submit form once again
        userEvent.click(submitButton);

        // Wait until submit handler is finally called
        await wait(() => expect(handleSubmit).toHaveBeenCalled());
    });
});
