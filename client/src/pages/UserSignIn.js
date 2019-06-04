// Imports
import React from "react";
import { Link } from "react-router-dom";

// Component
class UserSignIn extends React.Component {
    // Render to DOM
    render() {
        return (
            <div class="bounds">
                <div class="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" class="" placeholder="Password" />
                            </div>
                            <div class="grid-100 pad-bottom">
                                <button class="button" type="submit">Sign In</button>
                                <Link to="/" class="button button-secondary">Cancel</Link>
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

// Export
export default UserSignIn;
