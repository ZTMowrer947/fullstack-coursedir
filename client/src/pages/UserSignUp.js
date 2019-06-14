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
            errors: [],
            formData: {
                firstName: "",
                lastName: "",
                emailAddress: "",
                password: "",
                confirmPassword: "",
            },
        }
    }

    // Handle input changes
    handleInputChange(event) {
        // Get target name and value
        const {name, value} = event.target;

        // Update state with new input value
        this.setState(prevState => {
            return {
                ...prevState,
                formData: {
                    ...prevState.formData,
                    [name]: value,
                },
            };
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Remove errors from state
        this.setState(prevState => {
            return {
                ...prevState,
                errors: [],
            };
        });

        // Map state data to form data
        const formData = Object.keys(this.state.formData).reduce((data, key) => {
            // Get the value with the given key.
            // Get value from state if value is not empty, otherwise store null
            let value = this.state.formData[key] !== "" ?
                this.state.formData[key] :
                null;

            // Return updated form data
            return {
                ...data,
                [key]: value,
            }
        }, {});

        // Get form values
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = formData;

        // If the password and confirm password fields match,
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
            }).catch(error => {
                // If the errror has an attached response,
                if (error.response) {
                    // If the response status is 400 (Bad Request),
                    if (error.response.status === 400) {
                        // Get message from response body
                        const { message } = error.response.data;

                        // Split message into array of validation errors
                        const errors = message.split(",")
                            // Remove error prefix from validation errors
                            .map(error => {
                                // Get index of prefix terminator
                                const prefixIndex = error.indexOf(": ");

                                // Return error excluding error prefix
                                return error.substring(prefixIndex + 2);
                            });

                        // Update state with form errors
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                errors,
                            };
                        })
                    } else {
                        // Otherwise,
                        // Redirect to unhandled error page
                        this.props.history.push("/error");
                    }
                } else {
                    // Otherwise,
                    // Redirect to unhandled error page
                    this.props.history.push("/error");
                }
            });
        }
    }

    render() {
        // Map validation errors to list items
        const validationErrors = this.state.errors.map((error, index) => (
            <li key={index}>{error}</li>
        ));

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        {this.state.errors.length === 0 || (
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {validationErrors}
                                    </ul>
                                </div>
                            </div>
                        ) }
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