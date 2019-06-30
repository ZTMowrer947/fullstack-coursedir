// Error class
export default class ValidationError extends Error {
    constructor(message, formValues) {
        // Pass message to base error
        super(message);

        // Attach form values that were sent with request
        this.formValues = formValues;
    }
}