// Imports
import React from "react";
import AuthState from "../models/AuthState";

// Context setup
const AuthContext = React.createContext<AuthState>({
    user: undefined,
    getCredentials: () => "",
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {},
});

// Export
export default AuthContext;
