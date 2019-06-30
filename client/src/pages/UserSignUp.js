// Imports
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import withImmutablePropsToJS from "with-immutable-props-to-js";
import { createUserStart } from "../store/actions/auth";

// Component
class UserSignUp extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            passMismatch: false,
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
                passMismatch: false,
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

        // Create user
        this.props.signUp(formData);
    }

    // Run when component has mounted
    componentDidMount() {
        // If a user has already been signed in,
        if (this.props.user !== null) {
            // Redirect to home page
            this.props.history.push("/");
        }
    }

    render() {
        // Map validation errors to list items
        const validationErrors = this.props.validationErrors ? this.props.validationErrors.map((error, index) => (
            <li key={index}>{error}</li>
        )) : [];

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        {validationErrors.length > 0 && (
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

// Redux mapping to React props
const mapStateToProps = state => ({
    validationErrors: state.getIn(["auth", "validationErrors"]),
    error: state.getIn(["auth", "error"]),
    user: state.getIn(["auth", "user"]),
});

const mapDispatchToProps = dispatch => ({
    signUp: userData => {
        dispatch(createUserStart(userData));
    },
});

// HOC composition
const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withImmutablePropsToJS,
);

// Export
export default enhance(UserSignUp);