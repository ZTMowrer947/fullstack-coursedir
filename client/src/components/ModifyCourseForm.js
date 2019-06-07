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
            title: this.props.title,
            description: this.props.description,
            estimatedTime: this.props.estimatedTime,
            materialsNeeded: this.props.materialsNeeded,
        };
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

    // Handle form submisson
    handleFormSubmit(event) {
        // Prevent default behavior
        event.preventDefault();

        // TODO: Validate form

        // Call submit handler from props with form values
        this.props.onSubmit(this.state);
    }

    // Render to DOM
    render() {
        return (
            <div>
                {/* <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                </div> */}
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
                                    value={this.state.title}
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
                                    value={this.state.description}
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
                                            value={this.state.estimatedTime}
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
                                            value={this.state.materialsNeeded}
                                        ></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Create Course</button>
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
    estimatedTime: PropTypes.string.isRequired,
    materialsNeeded: PropTypes.string.isRequired,
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
