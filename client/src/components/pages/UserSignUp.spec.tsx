// Imports
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import AuthContext from '../../context/AuthContext';
import AuthState from '../../models/AuthState';
import UserFaker from '../../services/__testutils__/UserFaker';
import UserApi from '../../services/UserApi';
import UserSignUp from './UserSignUp';
import { EmailInUseError } from '../../models/errors';

// Mock
jest.mock('../../services/UserApi');

// Test Suite
describe('UserSignUp page', () => {
    // Teardown
    afterEach(() => {
        // Clear mocks
        mocked(UserApi.signIn).mockClear();
        mocked(UserApi.signUp).mockClear();
    });

    it('should call signup and signin methods of API when form is submitted successfully', async () => {
        // Generate random user data
        const { firstName, lastName, emailAddress } = UserFaker.fakeUser();
        const password = faker.internet.password(16);

        // Generate context data
        const contextValue: AuthState = {
            signIn: async (emailAddress, password) => {
                await UserApi.signIn(emailAddress, password);
            },
            signOut: () => {},
            getCredentials: () => undefined,
        };

        // Render component
        const { getByPlaceholderText, getByText } = render(
            <AuthContext.Provider value={contextValue}>
                <StaticRouter location="/signup">
                    <Route path="/signup" component={UserSignUp} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Get form fields and submit button
        const firstNameField = getByPlaceholderText('First Name');
        const lastNameField = getByPlaceholderText('Last Name');
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const confirmPasswordField = getByPlaceholderText('Confirm Password');
        const submitButton = getByText('Sign Up', {
            selector: 'button',
        });

        // Type fake data into form fields
        userEvent.type(firstNameField, firstName);
        userEvent.type(lastNameField, lastName);
        userEvent.type(emailAddrField, emailAddress);
        userEvent.type(passwordField, password);
        userEvent.type(confirmPasswordField, password);

        // Submit form
        userEvent.click(submitButton);

        // Wait for signin and signup methods to be called on API
        await wait(() => {
            expect(UserApi.signUp).toHaveBeenCalled();
            expect(UserApi.signIn).toHaveBeenCalled();
        });
    });

    it('should set validation error on email if API throws EmailInUseError', async () => {
        // Generate random user data
        const { firstName, lastName, emailAddress } = UserFaker.fakeUser();
        const password = faker.internet.password(16);

        // Define error
        const error = new EmailInUseError();

        // Setup signup mock to thrown email error
        mocked(UserApi.signUp).mockRejectedValueOnce(error);

        // Generate context data
        const contextValue: AuthState = {
            signIn: async (emailAddress, password) => {
                await UserApi.signIn(emailAddress, password);
            },
            signOut: () => {},
            getCredentials: () => undefined,
        };

        // Render component
        const { getByPlaceholderText, getByText } = render(
            <AuthContext.Provider value={contextValue}>
                <StaticRouter location="/signup">
                    <Route path="/signup" component={UserSignUp} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Get form fields and submit button
        const firstNameField = getByPlaceholderText('First Name');
        const lastNameField = getByPlaceholderText('Last Name');
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const confirmPasswordField = getByPlaceholderText('Confirm Password');
        const submitButton = getByText('Sign Up', {
            selector: 'button',
        });

        // Type fake data into form fields
        userEvent.type(firstNameField, firstName);
        userEvent.type(lastNameField, lastName);
        userEvent.type(emailAddrField, emailAddress);
        userEvent.type(passwordField, password);
        userEvent.type(confirmPasswordField, password);

        // Submit form
        userEvent.click(submitButton);

        // Wait for error message to be added to email field
        await wait(() => {
            expect(emailAddrField).toHaveClass('is-invalid');
            expect(getByText(error.message));
        });
    });
});
