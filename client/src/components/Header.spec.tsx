// Import
import { render } from '@testing-library/react';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

import Header from './Header';
import AuthState from '../models/AuthState';
import AuthContext from '../context/AuthContext';
import UserFaker from '../services/__testutils__/UserFaker';

// Test Suite
describe('Header component', () => {
    it('should render signup and signin links when user is logged out', () => {
        // Render component
        const { getByTestId } = render(
            <StaticRouter>
                <Header />
            </StaticRouter>
        );

        // Get links to test
        const signupLink = getByTestId('signup');
        const signinLink = getByTestId('signin');

        // Expect link hrefs to link to correct pages
        expect(signupLink).toHaveAttribute('href', '/signup');
        expect(signinLink).toHaveAttribute('href', '/signin');
    });

    it('should render greeting and signout link when user is logged in', () => {
        // Generate random user
        const user = UserFaker.fakeUser();

        // Setup context value
        const contextValue: AuthState = {
            user,
            getCredentials: () => undefined,
            signIn: async () => {},
            signOut: () => {},
        };

        // Render component
        const { getByTestId } = render(
            <AuthContext.Provider value={contextValue}>
                <StaticRouter>
                    <Header />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Get welcome message and signin link
        const greeting = getByTestId('greeting');
        const signoutLink = getByTestId('signout');

        // Define expected greeting text
        const greetingText = `Welcome ${user.firstName} ${user.lastName}!`;

        // Expect greeting to contain expected text
        expect(greeting).toHaveTextContent(greetingText);

        // Expect signout link href to link to signout route
        expect(signoutLink).toHaveAttribute('href', '/signout');
    });
});
