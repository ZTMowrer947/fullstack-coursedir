// Imports
import { Formik, FormikActions } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Course from "../../models/Course";

// Form values
interface DeleteCourseFormValues {
    confirmTitle: string;
}

// Prop Types
interface PropTypes {
    onSubmit: (
        values: DeleteCourseFormValues,
        formikActions: FormikActions<DeleteCourseFormValues>
    ) => void;
    course: Course;
}

// Component
const DeleteCourseForm: React.FC<PropTypes> = ({ onSubmit, course }) => {
    return (
        <Formik
            initialValues={{ confirmTitle: "" }}
            validate={(values: DeleteCourseFormValues) => {
                let errors: { [field: string]: string } = {};

                if (!values.confirmTitle) {
                    errors.confirmTitle = "Confirm Title is a required field.";
                } else if (values.confirmTitle !== course.title) {
                    errors.confirmTitle =
                        "Confirm Title field does not match course title.";
                }

                return errors;
            }}
            onSubmit={onSubmit}
            validateOnChange={false}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <Form noValidate method="POST" onSubmit={handleSubmit}>
                    <div>
                        <h1 className="display-4">WARNING!</h1>
                        <p>
                            This will permanently delete the "{course.title}"
                            course. Once it is deleted, it{" "}
                            <strong>CANNOT</strong> be recovered.
                        </p>
                        <p>
                            If you still wish to delete this course, please type
                            the title of the course to confirm the deletion.
                        </p>
                    </div>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="confirmTitle"
                            name="confirmTitle"
                            className="input-title course--title--input"
                            placeholder="Confirm title..."
                            value={values.confirmTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.confirmTitle}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmTitle}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="p-2 w-100">
                        <button
                            className="button"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            DELETE Course
                        </button>
                        <Link
                            to={`/courses/${course.id}`}
                            className="button button-secondary"
                        >
                            Cancel
                        </Link>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default DeleteCourseForm;
