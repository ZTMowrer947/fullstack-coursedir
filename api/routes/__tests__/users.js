// Imports
const request = require("supertest");
const app = require("../../app");

// Test Suite
describe("/api/users", () => {
    // Declare variables for test
    let emailAddress;

    // Run before all tests
    beforeAll(() => {
        // Set email address
        emailAddress = "exampleton@example.tld";
    });

    describe("POST method", () => {
        test("Should create a new user and return a 201 response", async () => {
            // Define user data
            const userData = {
                firstName: "Examply",
                lastName: "Exampleton",
                emailAddress,
                password: "password",
            };

            // POST to API
            const response = await request(app)
                .post("/api/users")
                .set("Content-Type", "application/json")
                .send(userData)
                
            // Expect a 201 Response
            expect(response.status).toBe(201);
        });

        test("Should return a 400 error if invalid data is provided", async () => {
            // Define invalid user data
            const invalidData = {
                firstName: "In",
                lastName: "valid",
                emailAddress: "invalidemail",
                password: "mattersnot",
            };

            // Model expected response body
            const expectedError = {
                error: "Bad Request",
                message: "Validation error: email address must be in the form of an email address",
            };

            // Attempt to create user
            const response = await request(app)
                .post("/api/users")
                .send(invalidData);

            // Expect a 400 Response
            expect(response.status).toBe(400);

            // Expect response body to equal expected error
            expect(response.body).toStrictEqual(expectedError);
        });

        test("should return a 400 if the provided email address is already in use", async () => {
            // Define user data
            const userData = {
                firstName: "Examply",
                lastName: "Exampleton",
                emailAddress,
                password: "password",
            };

            // POST to API
            const response = await request(app)
                .post("/api/users")
                .set("Content-Type", "application/json")
                .send(userData);

            // Model expected error
            const expectedError = {
                error: "Bad Request",
                message: "Email address has already been used by another user.",
            };
            
            // Expect a 400 response
            expect(response.status).toBe(400);

            // Expect response body to equal expected error
            expect(response.body).toStrictEqual(expectedError);
        });
    });

    describe("GET method", () => {
        test("should get a user with the given credentials", async () => {
            // Set authentication credentials
            const credentials = {
                emailAddress,
                password: "password",
            };

            // Get authenticated user
            const response = await request(app)
                .get("/api/users")
                .auth(credentials.emailAddress, credentials.password);

            // Expect a 200 OK response
            expect(response.status).toBe(200);

            // Get user from response body
            const user = response.body;

            // Expect user to match email and password data
            expect(user.emailAddress).toBe(credentials.emailAddress);
        });
    });
});
