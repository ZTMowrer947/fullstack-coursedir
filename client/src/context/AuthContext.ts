// Imports
import React from "react";
import AuthState from "../models/AuthState";

// Context setup
const AuthContext = React.createContext<AuthState>({
    user: undefined,
    loading: false,
    getCredentials: () => "",
    signIn: async () => {},
    signOut: () => {},
});

// Export
export default AuthContext;
