// Imports
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import React from 'react';
import { Route, StaticRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import UserApi from '../../services/UserApi';
import UserSignIn from './UserSignIn';
import AuthState from '../../models/AuthState';
import AuthContext from '../../context/AuthContext';

// Mock
jest.mock('../../services/UserApi');

// Test Suite
describe('UserSignIn page', () => {
    // Teardown
    afterEach(() => {
        // Clear mocks
        mocked(UserApi.signIn).mockClear();
    });

    // Tests
    it('should call signin method of API when submitting form', async () => {
        // Generate random email address and password
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password(16);

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
                <StaticRouter location="/signin">
                    <Route path="/signin" component={UserSignIn} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Get form and form fields
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('Sign In', {
            selector: 'button',
        });

        // Type fake data into form fields
        userEvent.type(emailAddrField, fakeEmail);
        userEvent.type(passwordField, fakePassword);

        // Submit form
        userEvent.click(submitButton);

        // Wait until signin method of API is called
        await wait(() => expect(UserApi.signIn).toHaveBeenCalled());
    });

    it('should display an error message if API returns signin error', async () => {
        // Generate random email address and password
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password(16);

        // Define error text and error object
        const errorMessage = 'Incorrect email/password combination.';
        const error = {
            response: {
                status: 401,
            },
        };

        // Setup signin method on API to throw error
        mocked(UserApi.signIn).mockRejectedValueOnce(error);

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
                <StaticRouter location="/signin">
                    <Route path="/signin" component={UserSignIn} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Get form and form fields
        const emailAddrField = getByPlaceholderText('Email Address');
        const passwordField = getByPlaceholderText('Password');
        const submitButton = getByText('Sign In', {
            selector: 'button',
        });

        // Type fake data into form fields
        userEvent.type(emailAddrField, fakeEmail);
        userEvent.type(passwordField, fakePassword);

        // Submit form
        userEvent.click(submitButton);

        // Wait until error message is found in form
        await wait(() => getByText(errorMessage));

        // Expect signin method on API to have been called
        expect(UserApi.signIn).toHaveBeenCalled();
    });
});
