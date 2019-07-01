// Imports
import React from "react";
import SignUpForm from "../components/SignUpForm";

// Component
class UserSignUp extends React.Component {
    // Handle form submission
    handleFormSubmit(formData) {
        console.log(formData);
    }

    // // Run when component has mounted
    // componentDidMount() {
    //     // If a user has already been signed in,
    //     if (this.props.user !== null) {
    //         // Redirect to home page
    //         this.props.history.push("/");
    //     }
    // }

    render() {
        return <SignUpForm onSubmit={this.handleFormSubmit.bind(this)} />
    }
}

// Export
export default UserSignUp;
