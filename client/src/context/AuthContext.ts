// Imports
import React from 'react';
import AuthState from '../models/AuthState';

// Context
const AuthContext = React.createContext<AuthState>({
    user: undefined,
    getCredentials: () => undefined,
    signIn: async () => {},
    signOut: () => {},
});

// Export
export default AuthContext;
