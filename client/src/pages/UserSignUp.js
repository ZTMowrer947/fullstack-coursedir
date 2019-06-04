// Imports
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component
class UserSignUp extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
        }
    }

    // Handle input changes
    handleInputChange(event) {
        // Get target name and value
        const {name, value} = event.target;

        // Update state with new input value
        this.setState({
            [name]: value,
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Get form values
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        // TODO: Validate form data

        // If the password and confirm password fields match
        if (password === confirmPassword) {
            // Create user through API
            axios.post("http://localhost:5000/api/users", {
                firstName,
                lastName,
                emailAddress,
                password,
            }).then(response => {
                if (response.status === 201) {
                    // Sign in the user
                    this.context.signIn(emailAddress, password);
                    
                    // Redirect to home page
                    this.props.history.push("/");
                }
            })
            // TODO: Handle validation errors
        }
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form method="POST" onSubmit={this.handleFormSubmit.bind(this)}>
                            <div>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className=""
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className=""
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={this.state.emailAddress}
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
                                    value={this.state.password}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className=""
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <Link to="/" className="button button-secondary">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}

// Context
UserSignUp.contextType = AuthContext;

// Export
export default UserSignUp;