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

// Component
class App extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            // Data for the currently authenticated user
            user: null,
        }

        /*
            Declare variable to hold user credentials.
            We DO NOT want to store user credentials in state
            because users with React Dev Tools could inspect state
            and get the credentials, thereby defeating the purpose of authentication.
        */
        this.credentials = null;

        // Define data to pass to context
        this.authData = {
            getCredentials: this.getCredentials,
            signIn: this.signIn,
            signOut: this.signOut,
            user: this.state.user,
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
        this.setState({
            user: response.data,
        });
    }

    // Sign-out function
    signOut() {
        // Clear credentials
        this.credentials = null;
    }

    // Render to DOM
    render() {
        return (
            <AuthContext.Provider value={this.authData}>
                <Layout>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact={true} component={Courses} />
                            <Route path="/courses/:id" exact={true} component={CourseDetail} />
                            <Route path="/signin" exact={true} component={UserSignIn} />
                        </Switch>
                    </BrowserRouter>
                </Layout>
            </AuthContext.Provider>
        );
    }
}

// Export
export default App;
