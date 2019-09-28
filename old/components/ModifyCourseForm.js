// Imports
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

// Component
class ModifyCourseForm extends React.Component {
    // Constructor
    constructor(props) {
        // Pass props to base class
        super(props);

        // Initialize state
        this.state = {
            form: {
                title: this.props.title,
                description: this.props.description,
                estimatedTime: this.props.estimatedTime || "",
                materialsNeeded: this.props.materialsNeeded || "",
            },
            errors: [],
        };
    }

    // Handle input changes
    handleInputChange(event) {
        // Get event target's name and value
        const { name, value } = event.target;

        // Update state for input field
        this.setState(prevState => {
            return {
                ...prevState,
                form: {
                    ...prevState.form,
                    [name]: value,
                },
            };
        });
    }

    // Handle form submisson
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // Reset validation errors
        this.setState({
            errors: [],
        });

        // Map state data to form data
        const formData = Object.keys(this.state.form).reduce((data, key) => {
            // Get the value with the given key.
            // Get value from state if value is not empty, otherwise store null
            let value = this.state.form[key] !== "" ?
                this.state.form[key] :
                null;

            // Return updated form data
            return {
                ...data,
                [key]: value,
            }
        }, {});

        // Call submit handler from props with form values
        this.props.onSubmit(formData).catch(error => {
            if (error.response) {
                // If the error is a 400 error,
                if (error.response.status === 400) {
                    // Get validation errors
                    const validationErrors = error.response.data.message.split(",\n").map(message => {
                        // Get index of prefix
                        const prefixIndex = message.indexOf(": ");

                        // Return actual error message
                        return message.substring(prefixIndex + 2);
                    });
                    
                    // Add validation errors to state
                    this.setState({
                        errors: validationErrors,
                    });
                } else if (error.response.status === 500) {
                    // If the error is a 500 error,
                    // Redirect to unhandled error page
                    this.props.history.push("/error");
                }
            }
        });
    }

    // Render to DOM
    render() {
        const validationErrors = this.state.errors.map((error, index) => (
            <li key={index}>{error}</li>
        ));

        return (
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
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="input-title course--title--input"
                                    placeholder="Course title..."
                                    onChange={this.handleInputChange.bind(this)}
                                    value={this.state.form.title}
                                />
                            </div>
                            <p>By {this.props.user.firstName} {this.props.user.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea
                                    id="description"
                                    name="description"
                                    className=""
                                    placeholder="Course description..."
                                    onChange={this.handleInputChange.bind(this)}
                                    value={this.state.form.description}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="text"
                                            className="course--time--input"
                                            placeholder="Hours"
                                            onChange={this.handleInputChange.bind(this)}
                                            value={this.state.form.estimatedTime}
                                        />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea
                                            id="materialsNeeded"
                                            name="materialsNeeded"
                                            className=""
                                            placeholder="List materials..."
                                            onChange={this.handleInputChange.bind(this)}
                                            value={this.state.form.materialsNeeded}
                                        ></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">{this.props.id ? "Update" : "Create"} Course</button>
                        <Link to={this.props.id ? `/courses/${this.props.id}` : "/"} className="button button-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// Prop Types
ModifyCourseForm.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string,
    materialsNeeded: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
}

// Default props
ModifyCourseForm.defaultProps = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
};

// Export
export default ModifyCourseForm;
