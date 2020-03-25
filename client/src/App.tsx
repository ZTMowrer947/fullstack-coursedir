// Imports
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/pages/CourseDetail';
import Courses from './components/pages/Courses';
import AuthContext from './context/AuthContext';
import AuthState from './models/AuthState';
import User from './models/User';

import './App.scss';

// Component
const App: React.FC = () => {
    // Initialize state
    const [user, setUser] = useState<User | undefined>(undefined);

    // Generate memoized auth data for context
    const authData = useMemo((): AuthState => {
        // Define functions for context
        const getCredentials = () => Cookies.get('sdbc-credentials');
        const signIn = async (emailAddress: string, password: string) => {
            // Make request to API to validate credentials
            const response = await axios.get<User>('/api/users', {
                auth: {
                    username: emailAddress,
                    password,
                },
            });

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
            setUser(response.data);
        };
        const signOut = () =>
            Cookies.remove('sdbc-credentials', {
                domain: document.domain,
                sameSite: 'strict',
            });

        return {
            user,
            getCredentials,
            signIn,
            signOut,
        };
    }, [user]);

    return (
        <AuthContext.Provider value={authData}>
            <Header />
            <Container fluid>
                <Switch>
                    <Redirect from="/" to="/courses" exact />
                    <Route path="/courses" exact component={Courses} />
                    <Route path="/courses/:id" exact component={CourseDetail} />
                </Switch>
            </Container>
        </AuthContext.Provider>
    );
};

// Export
export default App;
