// Imports
import { render } from '@testing-library/react';
import React from 'react';
import { Route, StaticRouter } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import AuthState from '../../models/AuthState';
import UserSignOut from './UserSignOut';

// Test Suite
describe('UserSignOut page', () => {
    it('should call signout function from context', () => {
        // Define context value
        const contextValue: AuthState = {
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

        // Expect signout function from context to be called
        expect(contextValue.signOut).toHaveBeenCalled();
    });
});
