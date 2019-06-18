// Imports
const request = require("supertest");
const app = require("../../app");
const authMiddleware = require("../auth");
const UserService = require("../../services/UserService");

// Define mock functions
// Mock request object
const mockReq = (encodedCredentials) => {
    // Define headers object
    let headers = {};

    // If encoded credentials were provided,
    if (encodedCredentials)
        // Set authorization object
        headers.authorization = `Basic ${encodedCredentials}`;

    // Return mock object
    return {
        headers,
        // Initialize user service
        userService: new UserService(),
    };
}

// Mock response object
const mockRes = () => {
    // Define response object
    const res = {};

    // Mock functions
    res.set = jest.fn().mockReturnValue(res);

    // Return response object
    return res;
};

// Mock next function
const mockNext = () => jest.fn();

// Test Suite
describe("Authentication middleware", () => {
    // Declare variables for tests
    let req, res, next;

    // Run before all tests
    beforeAll(async () => {
        // Define user data
        const userData = {
            firstName: "Archie",
            lastName: "Auth",
            emailAddress: "auth@example.tld",
            password: "password",
        };

        // Create user
        await request(app)
            .post("/api/users")
            .set("Content-Type", "application/json")
            .send(userData);
    });

    test("should pass no errors if valid credentials are provided", async () => {
        // Set credential string
        const credentialString = "auth@example.tld:password";

        // Encode as base64
        let encodedCredentials = Buffer.from(credentialString).toString("base64");

        // Trim padding from encoded credentials if present
        if (encodedCredentials.endsWith("=")) {
            const paddingIndex = encodedCredentials.indexOf("=");
            encodedCredentials = encodedCredentials.substring(0, paddingIndex);
        }

        // Mock functions
        req = mockReq(encodedCredentials);
        res = mockRes();
        next = mockNext();

        // Model unexpected errors
        const notFoundError = new Error(`User not found with email "nope@example.tld"`);
        notFoundError.name = "NotFoundError";
        notFoundError.status = 404;

        const noAuthError = new Error("Authentication is required for this route.");
        noAuthError.name = "NotAuthorizedError";
        noAuthError.status = 401;

        const passwordError = new Error("Incorrect password.");
        passwordError.name = "NotAuthorizedError";
        passwordError.status = 401;

        // Call middleware
        await authMiddleware(req, res, next);

        // Expect next to have been called
        expect(next).toHaveBeenCalled();

        // Expect next not to have been called with any of the above errors
        expect(next).not.toHaveBeenCalledWith(notFoundError);
        expect(next).not.toHaveBeenCalledWith(noAuthError);
        expect(next).not.toHaveBeenCalledWith(passwordError);
    });

    test("should pass a 401 Error if no credentials are provided", async () => {
        // Mock functions
        req = mockReq();
        res = mockRes();
        next = mockNext();

        // Model expected error
        const expectedError = new Error("Authentication is required for this route.");
        expectedError.name = "NotAuthorizedError";
        expectedError.status = 401;

        // Call middleware
        await authMiddleware(req, res, next);

        // Expect middleware to set WWW-Authenticate header
        expect(res.set).toHaveBeenCalledWith("WWW-Authenticate", "Basic");

        // Expect middleware to pass expected error
        expect(next).toHaveBeenCalledWith(expectedError);
    });

    test("should pass a 404 Error if the provided email address is not associated with a user", async () => {
        // Set credential string
        const credentialString = "nope@example.tld:password";

        // Encode as base64
        let encodedCredentials = Buffer.from(credentialString).toString("base64");

        // Trim padding from encoded credentials
        const paddingIndex = encodedCredentials.indexOf("=");
        encodedCredentials = encodedCredentials.substring(0, paddingIndex);

        // Mock functions
        req = mockReq(encodedCredentials);
        res = mockRes();
        next = mockNext();

        // Model expected error
        const expectedError = new Error(`User not found with email "nope@example.tld"`);
        expectedError.name = "NotFoundError";
        expectedError.status = 404;

        // Call middleware
        await authMiddleware(req, res, next);

        // Expect middleware to pass expected error
        expect(next).toHaveBeenCalledWith(expectedError);
    });

    test("should pass a 401 Error if an incorrect password is provided", async () => {
        // Set credential string
        const credentialString = "auth@example.tld:nope";

        // Encode as base64
        let encodedCredentials = Buffer.from(credentialString).toString("base64");

        // Trim padding from encoded credentials if present
        if (encodedCredentials.endsWith("=")) {
            const paddingIndex = encodedCredentials.indexOf("=");
            encodedCredentials = encodedCredentials.substring(0, paddingIndex);
        }

        // Mock functions
        req = mockReq(encodedCredentials);
        res = mockRes();
        next = mockNext();

        // Model expected error
        const expectedError = new Error("Incorrect password.");
        expectedError.name = "NotAuthorizedError";
        expectedError.status = 401;

        // Call middleware
        await authMiddleware(req, res, next);

        // Expect middleware to set WWW-Authenticate header
        expect(res.set).toHaveBeenCalledWith("WWW-Authenticate", "Basic");

        // Expect middleware to pass expected error
        expect(next).toHaveBeenCalledWith(expectedError);
    });
});