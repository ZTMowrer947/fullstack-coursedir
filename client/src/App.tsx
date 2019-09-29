import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Courses from "./components/pages/Courses";
import CourseDetail from "./components/pages/CourseDetail";
import LoadingIndicator from "./components/LoadingIndicator";
import UserSignIn from "./components/pages/UserSignIn";
import AuthContext from "./context/AuthContext";
import AuthState from "./models/AuthState";
import User from "./models/User";
import UserService from "./services/User.service";
import "./App.scss";

const App: React.FC = () => {
    // Initialize state
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    // Construct AuthState
    const authState: AuthState = {
        user,
        loading,
        getCredentials: UserService.getCredentials,
        signIn: async (emailAddress: string, password: string) => {
            // Attempt to sign in user
            const authUser = await UserService.signIn(emailAddress, password);

            // Set user state
            setUser(authUser);
        },
        signOut: () => {
            // Sign out user
            UserService.signOut();

            // Clear user state
            setUser(undefined);
        },
    };

    useEffect(() => {
        // Attempt to get credentials from cookie data
        const credentials = authState.getCredentials();

        // If there are persisted credentials, but the user hasn't been signed in,
        // and we are not currently loading,
        if (!!credentials && !user && !loading) {
            // Decode credentials
            const decodedCredentials = atob(credentials);
            const [emailAddress, password] = decodedCredentials.split(":");

            // Sign in user
            authState
                .signIn(emailAddress, password)
                .catch(() => {
                    // If credentials were invalid, sign out user
                    authState.signOut();
                })
                .finally(() => {
                    // In any case, unset loading flag
                    setLoading(false);
                });
        } else {
            // Otherwise, just unset loading flag
            setLoading(false);
        }
    }, [authState, user, loading]);

    return (
        <AuthContext.Provider value={authState}>
            <Layout>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <Switch>
                        <Redirect from="/" to="/courses" exact />
                        <Route path="/courses" exact component={Courses} />
                        <Route
                            path="/courses/:id"
                            exact
                            component={CourseDetail}
                        />
                        <Route path="/signin" component={UserSignIn} />
                    </Switch>
                )}
            </Layout>
        </AuthContext.Provider>
    );
};

export default App;
