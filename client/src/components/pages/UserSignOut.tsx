// Imports
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Redirect } from "react-router";

// Component
const UserSignOut: React.FC = () => {
    // Get signOut function from context
    const { signOut } = useContext(AuthContext);

    // Sign out user
    signOut();

    // Redirect to home page
    return <Redirect to="/" />;
};

// Export
export default UserSignOut;
