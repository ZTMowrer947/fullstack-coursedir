// Imports
import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

// Components
const Course = props => (
    <>
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    {/* Display links to course update and delete pages if user owning this course is currently signed in */}
                    {props.authUser && props.authUser.emailAddress === props.user.emailAddress &&
                        <span>
                            <Link className="button" to={`/courses/${props.id}/update`}>Update Course</Link>
                            <Link className="button" to={`/courses/${props.id}/delete`}>Delete Course</Link>
                        </span>
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
        </div>
        <div className="bounds course--detail">
            <div className="grid-66">
                <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{props.title}</h3>
                    <p>By {props.user.firstName} {props.user.lastName}</p>
                </div>
                <div className="course--description">
                    <ReactMarkdown source={props.description} />
                </div>
            </div>
            <div className="grid-25 grid-right">
                <div className="course--stats">
                    <ul className="course--stats--list">
                        {/* Display estimated time only if data is present */}
                        {props.estimatedTime && (
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{props.estimatedTime}</h3>
                            </li>
                        )}

                        {/* Display needed materials only if data is present */}
                        {props.materialsNeeded && (
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ReactMarkdown source={props.materialsNeeded} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </>
);

// Prop Types
Course.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string,
    materialsNeeded: PropTypes.string,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        emailAddress: PropTypes.string.isRequired,
    }).isRequired,
    authUser: PropTypes.shape({
        emailAddress: PropTypes.string.isRequired,
    }),
}


// Export
export default Course;