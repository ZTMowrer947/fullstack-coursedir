// Imports
import axios from "axios";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CookieContext from "universal-cookie";
import "./App.css";
import Layout from "./components/Layout";
import AuthContext from "./context/AuthContext";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import UserSignIn from "./pages/UserSignIn";
import UserSignOut from "./pages/UserSignOut";
import UserSignUp from "./pages/UserSignUp";
import PrivateRoute from "./components/PrivateRoute";
import CreateCourse from "./pages/CreateCourse";
import DeleteCourse from "./pages/DeleteCourse";
import LoadingIndicator from "./components/LoadingIndicator";
import UpdateCourse from "./pages/UpdateCourse";
import NotFound from "./pages/NotFound";

// Component
class App extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Create cookie context
        this.cookieContext = new CookieContext();

        // Initialize state
        this.state = {
            authData: {
                getCredentials: this.getCredentials.bind(this),
                signIn: this.signIn.bind(this),
                user: null,
            },
            isLoading: true,
        };
    }

    // Function to get credentials
    getCredentials() { return this.cookieContext.get("sdbc-credentials"); }

    // Get user with credentials
    async getUserWithCredentials(credentials) {
        // Get user from API with credentials
        const response = await axios.get("http://localhost:5000/api/users", {
            headers: {
                authorization: `Basic ${credentials}`,
            },
        });

        // Return the response body
        return response.data;
    }

    // Sign-in function
    async signIn(emailAddress, password) {
        // Declare variable to hold credentials
        let credentials = `${emailAddress}:${password}`;

        // Encode credentials using Base64
        credentials = Buffer.from(credentials).toString("base64");

        // Get user from API with credentials to verify correctness
        const user = await this.getUserWithCredentials(credentials);

        // If the request succeeds, store credentials for later use
        this.cookieContext.set("sdbc-credentials", credentials, {
            // Set domain and path
            domain: "localhost",
            path: "/",

            // Expire after 2 hours
            maxAge: 60 * 60 * 2,

            // Set secure flag when in production
            secure: process.env.NODE_ENV === "production",

            // Strict Same-Site policy
            sameSite: "strict",
        });

        // Update state with user data
        this.setState(prevState => {
            return {
                ...prevState,
                authData: {
                    ...prevState.authData,
                    user,
                }
            };
        });
    }

    // Sign-out function
    signOut() {
        // Clear credentials
        this.cookieContext.remove("sdbc-credentials", {
            // Set domain and path
            domain: "localhost",
            path: "/",

            // Expire after 2 hours
            maxAge: 60 * 60 * 2,

            // Set secure flag when in production
            secure: process.env.NODE_ENV === "production",

            // Strict Same-Site policy
            sameSite: "strict",
        });

        // Remove user from state
        this.setState(prevState => {
            return {
                ...prevState,
                authData: {
                    ...prevState.authData,
                    user: null,
                },
            };
        });
    }

    // Run when component has mounted
    componentDidMount() {
        // Get credentials
        const credentials = this.getCredentials();

        // If credentials are present but the user in state is not,
        if (credentials && this.state.authData.user === null) {
            // Get user with credentials
            this.getUserWithCredentials(credentials)
                // If successful,
                .then(user => {
                    // Update state with new user
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            authData: {
                                ...prevState.authData,
                                user,
                            },
                            isLoading: false,
                        };
                    });
                });
        } else {
            // Otherwise, update state to indicate that we are finished loading
            this.setState({
                isLoading: false,
            })
        }
    }

    // Render to DOM
    render() {
        return (
            <AuthContext.Provider value={this.state.authData}>                
                <BrowserRouter>
                    <Layout>
                        {/* If we are still loading, render LoadingIndicator, otherwise render routes */}
                        {this.state.isLoading ? <LoadingIndicator /> : (
                            <Switch>
                                <Route path="/" exact={true} component={Courses} />
                                <PrivateRoute path="/courses/create" exact={true} component={CreateCourse} />
                                <Route path="/courses/:id" exact={true} component={CourseDetail} />
                                <PrivateRoute path="/courses/:id/update" exact={true} component={UpdateCourse} />
                                <PrivateRoute path="/courses/:id/delete" exact={true} component={DeleteCourse} />
                                <Route path="/signup" exact={true} component={UserSignUp} />
                                <Route path="/signin" exact={true} component={UserSignIn} />
                                <Route path="/signout" exact={true} render={() => (
                                    // Pass signOut function to UserSignOut component
                                    <UserSignOut signOut={this.signOut.bind(this)} />
                                )} />
                                <Route path="/notfound" component={NotFound} />
                                <Redirect to="/notfound" />
                            </Switch>
                        )}
                    </Layout>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    }
}

// Export
export default App;
