import React, { useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Courses from "./components/pages/Courses";
import CourseDetail from "./components/pages/CourseDetail";
import LoadingIndicator from "./components/LoadingIndicator";
import AuthContext from "./context/AuthContext";
import AuthState from "./models/AuthState";
import User from "./models/User";
import UserService from "./services/User.service";
import "./App.scss";

const App: React.FC = () => {
    // Initialize state
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    // Construct AuthState
    const authState: AuthState = {
        user,
        loading,
        getCredentials: UserService.getCredentials,
        signIn: async (emailAddress: string, password: string) => {
            // Set loading flag
            setLoading(true);

            try {
                // Attempt to sign in user
                const authUser = await UserService.signIn(
                    emailAddress,
                    password
                );

                // Set user state
                setUser(authUser);
            } finally {
                // In any case, unset loading flag
                setLoading(false);
            }
        },
        signOut: () => {
            // Sign out user
            UserService.signOut();

            // Clear user state
            setUser(undefined);
        },
    };

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
                    </Switch>
                )}
            </Layout>
        </AuthContext.Provider>
    );
};

export default App;
