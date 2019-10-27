// Imports
import { Formik, FormikActions } from "formik";
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import User from "../../models/User";
import ModifyCourseDTO from "../../models/ModifyCourseDTO";

// Prop Types
interface PropTypes {
    onSubmit: (
        values: ModifyCourseDTO,
        formikActions: FormikActions<ModifyCourseDTO>
    ) => void;
    user: User;
    courseId?: string;
    title?: string;
    description?: string;
    estimatedTime?: string;
    materialsNeeded?: string;
}

// Component
const ModifyCourseForm: React.FC<PropTypes> = ({
    onSubmit,
    user,
    courseId,
    ...form
}) => {
    return (
        <Formik
            initialValues={{
                title: form.title || "",
                description: form.description || "",
                estimatedTime: form.estimatedTime || "",
                materialsNeeded: form.materialsNeeded || "",
            }}
            onSubmit={onSubmit}
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
                    <Row>
                        <Col xs={8}>
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Course title..."
                                        className="input-title course--title-input"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <p>
                                    By {user.firstName} {user.lastName}
                                </p>
                            </div>
                            <div className="course--description">
                                <Form.Group>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                    <Form.Control
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        className=""
                                        placeholder="Course descriptions..."
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.description}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                id="estimatedTime"
                                                name="estimatedTime"
                                                className="course--time--input"
                                                placeholder="Hours"
                                                value={values.estimatedTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    !!errors.estimatedTime
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.estimatedTime}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <Form.Group>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.materialsNeeded}
                                            </Form.Control.Feedback>
                                            <Form.Control
                                                as="textarea"
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                className=""
                                                placeholder="List materials..."
                                                value={values.materialsNeeded}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={
                                                    !!errors.materialsNeeded
                                                }
                                            />
                                        </Form.Group>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} className="pb-2">
                            <button
                                className="button"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {!!courseId ? "Update" : "Create"} Course
                            </button>
                            <Link
                                to={!!courseId ? `/courses/${courseId}` : "/"}
                                className="button button-secondary"
                            >
                                Cancel
                            </Link>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

// Export
export default ModifyCourseForm;
