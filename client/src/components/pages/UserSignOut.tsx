// Imports
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

// Page
const UserSignOut: React.FC = () => {
    // Get signout function and user data from AuthContext
    const { signOut, user } = useContext(AuthContext);

    // Sign out user if needed
    useEffect(() => {
        // If we need to sign out a user,
        if (user) {
            // Sign them out
            signOut();
        }
    }, [user, signOut]);

    // If user has been signed out, redirect to home page
    if (!user) return <Redirect to="/" />;

    // Otherwise, render nothing
    return null;
};

// Export
export default UserSignOut;
