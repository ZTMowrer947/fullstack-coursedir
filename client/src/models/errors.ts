// Imports
import { ValidationError } from 'class-validator';

// Error types
export class NotFoundError extends Error {
    constructor() {
        super('The requested resource was not found.');
        this.name = 'NotFoundError';
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('You do not have permission to perform the requested action.');
        this.name = 'ForbiddenError';
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid email/password combination.');
        this.name = 'InvalidCredentialsError';
    }
}

export class EmailInUseError extends Error {
    constructor() {
        super('Email address is already in use by another user.');
        this.name = 'EmailInUseError';
    }
}

export class ServerValidationError extends Error {
    errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super(
            `Server validation failed, check 'errors' property for more info.`
        );
        this.errors = errors;
        this.name = 'ServerValidationError';
    }
}

export class UnexpectedServerError extends Error {
    constructor() {
        super('An unexpected error occurred on the server.');
        this.name = 'UnexpectedServerError';
    }
}
