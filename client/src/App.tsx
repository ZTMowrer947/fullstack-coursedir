// Imports
import React, { useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';
import CourseDetail from './components/pages/CourseDetail';
import Courses from './components/pages/Courses';
import CreateCourse from './components/pages/CreateCourse';
import UserSignIn from './components/pages/UserSignIn';
import UserSignOut from './components/pages/UserSignOut';
import UserSignUp from './components/pages/UserSignUp';
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
        const { getCredentials } = UserApi;

        const signIn = async (emailAddress: string, password: string) => {
            // Use API to verify credentials
            const user = await UserApi.signIn(emailAddress, password);

            // Attach user data to state
            setUser(user);
        };

        const signOut = () => {
            // Remove credential data
            UserApi.signOut();

            // Remove user from state
            setUser(undefined);
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
            {isReady ? (
                <>
                    <Header />
                    <Container fluid>
                        <Switch>
                            <Redirect from="/" to="/courses" exact />
                            <Route path="/courses" exact component={Courses} />
                            <PrivateRoute
                                path="/courses/create"
                                exact
                                component={CreateCourse}
                            />
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
                            <Route
                                path="/signup"
                                exact
                                component={UserSignUp}
                            />
                            <Route
                                path="/signout"
                                exact
                                component={UserSignOut}
                            />
                        </Switch>
                    </Container>
                </>
            ) : (
                <Loading />
            )}
        </AuthContext.Provider>
    );
};

// Export
export default App;
