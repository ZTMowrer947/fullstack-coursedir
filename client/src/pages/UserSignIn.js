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
        this.context.signIn(emailAddress, password)
            // If sign-in succeeds,
            .then(() => {
                // Define previous url, defaulting to home page
                let prevUrl = "/";

                // If the location state is defined and contains a prevUrl key,
                if (this.props.location.state && this.props.location.state.prevUrl) 
                    // Get previous URL from location state and set previous URL to that
                    prevUrl = this.props.location.state.prevUrl;

                // Redirect to previous page
                this.props.history.push(prevUrl);
            })
            // If sign-in fails,
            .catch(error => {
                // If the error has an attached response,
                if (error.response) {
                    // Get the status code
                    const { status } = error.response;
                    
                    // If the status code is in the 400 series,
                    if (status >= 400 && status < 500) {
                        // Add error message to state
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                formErrors: [...prevState.formErrors, error.response.data.message],
                            };
                        });
                    } else {
                        // Otherwise,
                        // Redirect to unhandled error page
                        this.props.history.push("/error");
                    }
                }
            });
    }

    // Run when component has mounted
    componentDidMount() {
        // If a user has already been signed in,
        if (this.context.user !== null) {
            // Redirect to home page
            this.props.history.push("/");
        }
    }

    // Render to DOM
    render() {
        const errors = this.state.formErrors.map((error, index) => (
            <li key={index}>{error}</li>
        ));

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    {this.state.formErrors.length === 0 || (
                        <div>
                            <h2 className="validation--errors--label">Login errors:</h2>
                            <div className="validation-errors">
                                <ul>
                                    {errors}
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

// Context
UserSignIn.contextType = AuthContext;

// Export
export default UserSignIn;
