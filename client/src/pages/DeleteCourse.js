// Imports
import axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

// Component
class DeleteCourse extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            course: null,
            confirmTitle: "",
            errors: [],
            isLoading: true,
        }
    }

    // Handle input changes
    handleInputChange(event) {
        // Get event target's name and value
        const { name, value } = event.target;

        // Update state for input field
        this.setState({
            [name]: value,
        });
    }

    // Handle form submission
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Remove errors from state
        this.setState({
            errors: [],
        });

        // Get form data
        const { confirmTitle } = this.state;

        // If the confirm title field matches the course title,
        if (this.state.course.title === confirmTitle) {
            // Get user credentials
            const credentials = this.props.getCredentials();

            // Delete the course
            axios.delete(`http://localhost:5000/api/courses/${this.state.course.id}`, {
                headers: {
                    authorization: `Basic ${credentials}`,
                }
            })
                // If this is successful,
                .then(() => {
                    // Redirect to home page
                    this.props.history.push("/");
                })
                // If an error occurs,
                .catch(error => {
                    // If a response is included,
                    if (error.response) {
                        // Consider the response status
                        switch (error.response.status) {
                            // Not Found
                            case 404:
                                // Redirect to not found page
                                this.props.history.push("/notfound");
                                break;

                            // Forbidden
                            case 403:
                                // Redirect to forbidden error page
                                this.props.history.push("/forbidden", { courseId: this.state.course.id });
                                break;

                            // Any other error
                            default:
                                // Redirect to unhandled error page
                                this.props.history.push("/error");
                                break;
                        }
                    } else {
                        // Otherwise, redirect to unhandled error page
                        this.props.history.push("/error");
                    }
                });
        } else {
            // Otherwise, add error message to state
            const error = `The "confirm title" value "${confirmTitle}" does not match the course title "${this.state.course.title}".`;

            this.setState(prevState => {
                return {
                    ...prevState,
                    errors: [...prevState.errors, error],
                };
            });
        }
    }

    componentDidMount() {
        // Get course ID
        const { id } = this.props.match.params;

        // Get course by ID
        axios.get(`http://localhost:5000/api/courses/${id}`)
            // If this succeeds,
            .then(response => {
                // Store course in state
                this.setState({
                    course: response.data,
                    isLoading: false,
                });
            })
            // If an error occurs,
            .catch(error => {
                // If a response is included,
                if (error.response) {
                    // Consider the response status
                    switch (error.response.status) {
                        // Not Found
                        case 404:
                            // Redirect to not found page
                            this.props.history.push("/notfound");
                            break;

                        // Any other error
                        default:
                            // Redirect to unhandled error page
                            this.props.history.push("/error");
                            break;
                    }
                } else {
                    // Otherwise, redirect to unhandled error page
                    this.props.history.push("/error");
                }
            });
    }

    // Render to DOM
    render() {
        // If we are still loading
        if (this.state.isLoading)
            // Render loading indicator
            return <LoadingIndicator size={40} />;
        else if (this.state.course.user.emailAddress !== this.props.user.emailAddress)
            // If the email of the currently logged in user differs from that of the course's creator,
            // Redirect to the forbidden error page
            return <Redirect to={{ pathname: "/forbidden", state: { courseId: this.state.course.id }}} />

        // Otherwise, render delete confirmation form
        return (
            <div className="bounds grid-66">
                <div>
                    <h4 className="course--label">Delete Course</h4>
                </div>
                <div>
                    <form method="POST" onSubmit={this.handleFormSubmit.bind(this)}>
                        <div>
                            <h1>Warning!</h1>
                            <p>This will delete the "{this.state.course.title}" course. Once it is deleted, it <strong>CANNOT</strong> be recovered.</p>
                            <p>Please type the course title below to confirm the deletion.</p>
                        </div>
                        <div>
                            <input
                                id="confirmTitle"
                                name="confirmTitle"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Confirm title..."
                                onChange={this.handleInputChange.bind(this)}
                                value={this.state.confirmTitle}
                            />
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">DELETE Course</button>
                            <Link to={`/${this.props.match.params.id}`} className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// Prop Types
DeleteCourse.propTypes = {
    getCredentials: PropTypes.func.isRequired,
    user: PropTypes.shape({
        emailAddress: PropTypes.string.isRequired,
    }).isRequired,
}

// Export
export default DeleteCourse;