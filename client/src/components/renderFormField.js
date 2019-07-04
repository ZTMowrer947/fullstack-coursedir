// Imports
import React from "react";

// Field render function
const renderField = ({
    input,
    placeholder,
    type,
    meta: { touched, error, warning }
}) => (
<div className="field">
    <input {...input} placeholder={placeholder} type={type} className={error ? "invalid" : ""} />
    {touched &&
        ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
</div>
);

// Export
export default renderField;
