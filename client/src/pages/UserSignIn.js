// Imports
import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component
class UserSignIn extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
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

        // Get data from form inputs
        const { emailAddress, password } = this.state;

        // Attempt to sign in using credentials
        this.context.signIn(emailAddress, password)
            // If sign-in succeeds,
            .then(() => {
                // Redirect to home page
                this.props.history.push("/");
            });
    }

    // Render to DOM
    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
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

// Context
UserSignIn.contextType = AuthContext;

// Export
export default UserSignIn;
