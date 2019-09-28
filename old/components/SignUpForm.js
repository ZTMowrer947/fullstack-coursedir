// Imports
import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form/immutable";
import { signUp } from "../store/actions/auth";
import renderFormField from "./renderFormField";
import "./SignUpForm.css";

// Component
const SignUpForm = props => {
    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form method="POST" onSubmit={props.handleSubmit(signUp)}>
                        {props.error && <p className="form-error">{props.error}</p>}
                        <div>
                            <Field
                                id="firstName"
                                name="firstName"
                                component={renderFormField}
                                type="text"
                                className=""
                                placeholder="First Name"
                            />
                        </div>
                        <div>
                            <Field
                                id="lastName"
                                name="lastName"
                                component={renderFormField}
                                type="text"
                                className=""
                                placeholder="Last Name"
                            />
                        </div>
                        <div>
                            <Field
                                id="emailAddress"
                                name="emailAddress"
                                component={renderFormField}
                                type="text"
                                className=""
                                placeholder="Email Address"
                            />
                        </div>
                        <div>
                            <Field
                                id="password"
                                name="password"
                                component={renderFormField}
                                type="password"
                                className=""
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                component={renderFormField}
                                type="password"
                                className=""
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit" disabled={props.submitting}>Sign Up</button>
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
