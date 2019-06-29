// Imports
import axios from "axios";
import { ConnectedRouter } from "connected-react-router/immutable";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import CookieContext from "universal-cookie";
import withImmutablePropsToJS from "with-immutable-props-to-js";
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
import Forbidden from "./pages/Forbidden";
import UnhandledError from "./pages/UnhandledError";
import { history } from "./store";
import { signInStart, signOut } from "./store/actions/auth";

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

    // Run when component has mounted
    componentDidMount() {
        // Get credentials and user
        const { credentials, user } = this.props;

        // If credentials are present, but the user isn't,
        if (credentials && user === null) {
            // Decode the credentials
            const decoded = Buffer.from(credentials, "base64").toString();

            // Sign in the user
            this.props.signIn(...decoded.split(":"));
        }

        // Otherwise, update state to indicate that we are finished loading
        this.setState({
            isLoading: false,
        });
    }

    // Render to DOM
    render() {
        return (
            <AuthContext.Provider value={this.state.authData}>                
                <ConnectedRouter history={history}>
                    <Layout>
                        {/* If we are still loading, render LoadingIndicator, otherwise render routes */}
                        {this.state.isLoading ? <LoadingIndicator /> : (
                            <Switch>
                                <Route path="/" exact={true} component={Courses} />
                                <PrivateRoute path="/courses/create" exact={true} component={CreateCourse} />
                                <Route path="/courses/:id" exact={true} component={CourseDetail} />
                                <PrivateRoute path="/courses/:id/update" exact={true} component={UpdateCourse} />
                                <PrivateRoute path="/courses/:id/delete" exact={true} component={DeleteCourse} />
                                {/* <Route path="/signup" exact={true} component={UserSignUp} />
                                <Route path="/signin" exact={true} component={UserSignIn} />
                                <Route path="/signout" exact={true} render={() => (
                                    // Pass signOut function to UserSignOut component
                                    <UserSignOut signOut={this.signOut.bind(this)} />
                                )} /> */}
                                <Route path="/forbidden" component={Forbidden} />
                                <Route path="/notfound" component={NotFound} />
                                <Route path="/error" component={UnhandledError} />
                                <Redirect to="/notfound" />
                            </Switch>
                        )}
                    </Layout>
                </ConnectedRouter>
            </AuthContext.Provider>
        );
    }
}

// Redux mapping to React props
const mapStateToProps = state => {
    const authState = state.get("auth");
    return {
        isFetching: authState.get("isFetching"),
        user: authState.get("user"),
        credentials: authState.get("credentials"),
    };
};

const mapDispatchToProps = dispatch => ({
    signIn: (emailAddress, password) => {
        dispatch(signInStart(emailAddress, password));
    },
    signOut: () => {
        dispatch(signOut());
    },
});

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withImmutablePropsToJS(App));
