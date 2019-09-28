// Imports
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom"

// Components
const CourseLink = props => (
    <div className="grid-33">
        <Link to={`/courses/${props.id}`} className="course--module course--link">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{props.title}</h3>
        </Link>
    </div>
);

// Prop Types
CourseLink.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
}

// Export
export default CourseLink;