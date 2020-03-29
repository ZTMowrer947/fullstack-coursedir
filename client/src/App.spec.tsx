// Imports
import { render, waitForDomChange } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import App from './App';
import UserApi from './services/UserApi';

// Mocks
jest.mock('./services/UserApi');

// Test Suite
describe('App component', () => {
    // Teardown
    afterEach(() => {
        // Clear user data
        UserApi.signOut();

        // Clear mock
        mocked(UserApi.getCredentials).mockClear();
        mocked(UserApi.signIn).mockClear();
    });

    // Tests
    it('should render as normal when no credentials are persisted', async () => {
        // Render app inside StaticRouter
        const { queryByTestId } = render(
            <StaticRouter>
                <App />
            </StaticRouter>
        );

        // Query for signin and signup links
        const signinLink = queryByTestId('signin');
        const signupLink = queryByTestId('signup');

        // Expect both to exist
        expect(signinLink).toBeInTheDocument();
        expect(signupLink).toBeInTheDocument();

        // Expect getCredentials to be called, but not signIn
        expect(UserApi.getCredentials).toHaveBeenCalled();
        expect(UserApi.signIn).not.toHaveBeenCalled();
    });

    it('should auto sign in user when credentials are persisted', async () => {
        // Generate random email and password
        const emailAddress = faker.internet.email();
        const password = faker.internet.password(16);

        // Sign in user
        await UserApi.signIn(emailAddress, password);

        // Render app inside StaticRouter
        const { queryByTestId, queryByText } = render(
            <StaticRouter>
                <App />
            </StaticRouter>
        );

        // Wait for DOM changes
        await waitForDomChange();

        // Get welcome message and signout link
        const welcomeMessage = queryByText(/^Welcome/);
        const signoutLink = queryByTestId('signout');

        // Expect both to exist
        expect(welcomeMessage).toBeInTheDocument();
        expect(signoutLink).toBeInTheDocument();

        // Expect getCredentials and signin to be called
        expect(UserApi.getCredentials).toHaveBeenCalled();
        expect(UserApi.signIn).toHaveBeenCalledTimes(2);
    });
});
