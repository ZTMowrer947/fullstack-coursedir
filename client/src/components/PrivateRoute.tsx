// Imports
import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// Component
const PrivateRoute = <T extends RouteProps = RouteProps>(props: T) => {
    // Get user data from context
    const { user } = useContext(AuthContext);

    // If user data is not present,
    if (!user) {
        // Determine URL for redirection after signin is complete
        const prevUrl = props.location?.pathname ?? '/';

        // Return redirection to signin page
        return <Redirect to={{ pathname: '/signin', state: { prevUrl } }} />;
    }

    // Otherwise, render route as usual
    return <Route {...props} />;
};

// Export
export default PrivateRoute;
