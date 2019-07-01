// Imports
import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form/immutable";

// Component
const SignUpForm = props => {
    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form method="POST" onSubmit={props.handleSubmit}>
                        <div>
                            <Field
                                id="firstName"
                                name="firstName"
                                component="input"
                                type="text"
                                className=""
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <Field
                                id="lastName"
                                name="lastName"
                                component="input"
                                type="text"
                                className=""
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <Field
                                id="emailAddress"
                                name="emailAddress"
                                component="input"
                                type="text"
                                className=""
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <Field
                                id="password"
                                name="password"
                                component="input"
                                type="password"
                                className=""
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                component="input"
                                type="password"
                                className=""
                                placeholder="Confirm Password"
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

// Redux form config
const formConfig = {
    form: "signup",
    initialValues: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
    },
};

// Redux Form connection
const ConnectedSignUpForm = reduxForm(formConfig)(SignUpForm);

// Export
export default ConnectedSignUpForm;
