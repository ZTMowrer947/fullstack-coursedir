// Imports
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import withImmutablePropsToJS from "with-immutable-props-to-js";
import { signInStart } from "../store/actions/auth";

// Component
class UserSignIn extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            formErrors: [],
            emailAddress: "",
            password: "",
        };
    }

    // Handle input change
    handleInputChange(event) {
        // Get target name
        const name = event.target.name;

        // Update state with new input value
        this.setState({
            [name]: event.target.value,
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Remove form errors from state
        this.setState({
            formErrors: [],
        })

        // Get data from form inputs
        const { emailAddress, password } = this.state;

        // Attempt to sign in using credentials
        this.props.signIn(emailAddress, password, this.props.location.state ? this.props.location.state.prevUrl : "/");
    }

    // Run when component has mounted
    componentDidMount() {
        // If a user has already been signed in,
        if (this.props.user !== null) {
            // Redirect to home page
            this.props.history.push("/");
        }
    }

    // Render to DOM
    render() {
        // If the error doesn't have an attached response,
        if (this.props.error && !this.props.error.response) {
            // Redirect to error page
            return <Redirect to="/error" />
        }

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    {this.props.error === null || (
                        <div>
                            <h2 className="validation--errors--label">Login errors:</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{this.props.error.response.data.message}</li>
                                </ul>
                            </div>
                        </div>
                    ) }
                    <div>
                        <form method="POST" onSubmit={this.handleFormSubmit.bind(this)}>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link to="/" className="button button-secondary">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }
}

// Redux mapping to React props
const mapStateToProps = state => {
    const authState = state.get("auth");

    return {
        user: authState.get("user"),
        error: authState.get("error"),
    };
}

const mapDispatchToProps = dispatch => ({
    signIn: (emailAddress, password, prevUrl) => {
        dispatch(signInStart(emailAddress, password, prevUrl));
    },
});

// Export
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withImmutablePropsToJS(UserSignIn));
