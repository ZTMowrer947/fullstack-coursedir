// Imports
import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AuthContext from "./context/AuthContext";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import UserSignIn from "./pages/UserSignIn";
import UserSignOut from "./pages/UserSignOut";
import UserSignUp from "./pages/UserSignUp";

// Component
class App extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        /*
            Declare variable to hold user credentials.
            We DO NOT want to store user credentials in state
            because users with React Dev Tools could inspect state
            and get the credentials, thereby defeating the purpose of authentication.
        */
       this.credentials = null;

        // Initialize state
        this.state = {
            authData: {
                getCredentials: this.getCredentials.bind(this),
                signIn: this.signIn.bind(this),
                user: null,
            },
        };
    }

    // Function to get credentials
    getCredentials() { return this.credentials; }

    // Sign-in function
    async signIn(emailAddress, password) {
        // Declare variable to hold credentials
        let credentials = `${emailAddress}:${password}`;

        // Encode credentials using Base64
        credentials = Buffer.from(credentials).toString("base64");

        // Get user from API with credentials to verify correctness
        const response = await axios.get("http://localhost:5000/api/users", {
            headers: {
                authorization: `Basic ${credentials}`,
            },
        });

        // If the request succeeds, store credentials for later use
        this.credentials = credentials;

        // Update state with user data
        this.setState(prevState => {
            return {
                ...prevState,
                authData: {
                    ...prevState.authData,
                    user: response.data,
                }
            };
        });
    }

    // Sign-out function
    signOut() {
        // Clear credentials
        this.credentials = null;

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

    // Render to DOM
    render() {
        return (
            <AuthContext.Provider value={this.state.authData}>                
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/" exact={true} component={Courses} />
                            <Route path="/courses/:id" exact={true} component={CourseDetail} />
                            <Route path="/signup" exact={true} component={UserSignUp} />
                            <Route path="/signin" exact={true} component={UserSignIn} />
                            <Route path="/signout" exact={true} render={() => (
                                // Pass signOut function to UserSignOut component
                                <UserSignOut signOut={this.signOut.bind(this)} />
                            )} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </AuthContext.Provider>
        );
    }
}

// Export
export default App;
