// Imports
import { render } from '@testing-library/react';
import React from 'react';
import { Route, StaticRouter } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import AuthContext from '../../context/AuthContext';
import AuthState from '../../models/AuthState';
import UserFaker from '../../services/__testutils__/UserFaker';
import UserSignOut from './UserSignOut';

// Test Suite
describe('UserSignOut page', () => {
    it('should call signout function from context if user is signed in', () => {
        // Generate fake user
        const user = UserFaker.fakeUser();

        // Define context value
        let contextValue: AuthState = {
            getCredentials: () => undefined,
            signOut: jest.fn(),
            signIn: async () => {},
            user,
        };

        mocked(contextValue.signOut).mockImplementation(() => {
            contextValue = {
                ...contextValue,
                user: undefined,
            };
        });

        // Render component
        render(
            <AuthContext.Provider value={contextValue}>
                <StaticRouter location="/signout">
                    <Route path="/signout" component={UserSignOut} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Expect signout function from context to be called
        expect(contextValue.signOut).toHaveBeenCalled();
    });

    it('should not do anything if no user is signed in', () => {
        // Define context value
        let contextValue: AuthState = {
            getCredentials: () => undefined,
            signOut: jest.fn(),
            signIn: async () => {},
        };

        // Render component
        render(
            <AuthContext.Provider value={contextValue}>
                <StaticRouter location="/signout">
                    <Route path="/signout" component={UserSignOut} />
                </StaticRouter>
            </AuthContext.Provider>
        );

        // Expect signout function from context not to be called
        expect(contextValue.signOut).not.toHaveBeenCalled();
    });
});
