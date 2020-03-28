// Imports
import Cookies from 'js-cookie';
import React, { useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/pages/CourseDetail';
import Courses from './components/pages/Courses';
import UserSignIn from './components/pages/UserSignIn';
import AuthContext from './context/AuthContext';
import AuthState from './models/AuthState';
import User from './models/User';
import UserApi from './services/UserApi';

import './App.scss';

// Component
const App: React.FC = () => {
    // Initialize state
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isReady, setIsReady] = useState(false);

    // Generate memoized auth data for context
    const authData = useMemo((): AuthState => {
        // Define functions for context
        const { getCredentials, signOut } = UserApi;

        const signIn = async (emailAddress: string, password: string) => {
            // Use API to verify credentials
            const user = await UserApi.signIn(emailAddress, password);

            // If successful, store credentials in cookie data
            Cookies.set(
                'sdbc-credentials',
                btoa(`${emailAddress}:${password}`),
                {
                    domain: document.domain,
                    sameSite: 'strict',
                    // Expire in two hours
                    expires: new Date(Date.now() + 7200000),
                }
            );

            // Attach user data to state
            setUser(user);
        };

        return {
            user,
            getCredentials,
            signIn,
            signOut,
        };
    }, [user]);

    // Sign in user if credentials are persisted in cookie
    useEffect(() => {
        // If we are already ready, do nothing
        if (isReady) return;

        // Get credentials from cookie data
        const credentials = authData.getCredentials();

        // If credentials are not present or user is present, stop here
        if (!credentials || authData.user) return setIsReady(true);

        // Otherwise, decode credentials
        const [emailAddress, password] = atob(credentials).split(':');

        // Sign in using credentials
        authData
            .signIn(emailAddress, password)
            .catch(() => {
                // If error occurred, remove credentials from cookie data
                authData.signOut();
            })
            .finally(() => {
                // In any case, we are now ready
                setIsReady(true);
            });
    }, [authData, isReady]);

    return (
        <AuthContext.Provider value={authData}>
            {isReady && (
                <>
                    <Header />
                    <Container fluid>
                        <Switch>
                            <Redirect from="/" to="/courses" exact />
                            <Route path="/courses" exact component={Courses} />
                            <Route
                                path="/courses/:id"
                                exact
                                component={CourseDetail}
                            />
                            <Route
                                path="/signin"
                                exact
                                component={UserSignIn}
                            />
                        </Switch>
                    </Container>
                </>
            )}
        </AuthContext.Provider>
    );
};

// Export
export default App;
