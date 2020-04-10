// Imports
import React, { Suspense, lazy, useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import AuthState from './models/AuthState';
import User from './models/User';
import UserApi from './services/UserApi';

import './App.scss';

// Lazy components
const CourseDetail = lazy(() => import('./components/pages/CourseDetail'));
const Courses = lazy(() => import('./components/pages/Courses'));
const CreateCourse = lazy(() => import('./components/pages/CreateCourse'));
const DeleteCourse = lazy(() => import('./components/pages/DeleteCourse'));
const UpdateCourse = lazy(() => import('./components/pages/UpdateCourse'));
const UserSignIn = lazy(() => import('./components/pages/UserSignIn'));
const UserSignOut = lazy(() => import('./components/pages/UserSignOut'));
const UserSignUp = lazy(() => import('./components/pages/UserSignUp'));

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
        <ErrorBoundary>
            <AuthContext.Provider value={authData}>
                {isReady ? (
                    <>
                        <Header />
                        <Container fluid>
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    <Redirect from="/" to="/courses" exact />
                                    <Route
                                        path="/courses"
                                        exact
                                        component={Courses}
                                    />
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
                                    <PrivateRoute
                                        path="/courses/:id/update"
                                        exact
                                        component={UpdateCourse}
                                    />
                                    <PrivateRoute
                                        path="/courses/:id/delete"
                                        exact
                                        component={DeleteCourse}
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
                            </Suspense>
                        </Container>
                    </>
                ) : (
                    <Loading />
                )}
            </AuthContext.Provider>
        </ErrorBoundary>
    );
};

// Export
export default App;
