// Imports
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';

// Page
const UserSignOut: React.FC = () => {
    // Get signout function from AuthContext
    const { signOut } = useContext(AuthContext);

    // Sign out user
    signOut();

    // Redirect to home page
    return <Redirect to="/" />;
};

// Export
export default UserSignOut;
