// Imports
import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import AuthContext from "./context/AuthContext";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";

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

        // Define service object to pass to context
        this.authService = {
            getCredentials: this.getCredentials,
            signIn: this.signIn,
            signOut: this.signOut,
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
        await axios.get("http://localhost:5000/api/users", {
            headers: {
                authorization: `Basic ${credentials}`,
            },
        });

        // If the request succeeds, store credentials for later use
        this.credentials = credentials;
    }

    // Sign-out function
    signOut() {
        // Clear credentials
        this.credentials = null;
    }

    // Render to DOM
    render() {
        return (
            <AuthContext.Provider value={this.authService}>
                <Layout>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact={true} component={Courses} />
                            <Route path="/courses/:id" exact={true} component={CourseDetail} />
                        </Switch>
                    </BrowserRouter>
                </Layout>
            </AuthContext.Provider>
        );
    }
}

// Export
export default App;
