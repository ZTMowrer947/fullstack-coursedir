// Imports
import { ValidationError } from 'class-validator';

// Error types
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
