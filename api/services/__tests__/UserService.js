// Imports
const UserService = require("../UserService");
const bcrypt = require("bcryptjs");

// Test Suite
describe("User service", () => {
    // Declare variables for test
    let service;
    let userData;

    // Run before all tests
    beforeAll(() => {
        // Initialize user service
        service = new UserService();

        // Set user data
        userData = {
            firstName: "Examply",
            lastName: "Exampleton",
            emailAddress: "exampleton@example.tld",
            password: "password",   // Best password ever (good thing it's only a test)
        };
    });

    describe("create method", () => {
        test("should create a new user when given valid input data", async () => {
            // Create new user
            const user = await service.create(userData);

            // Expect user to match input data
            expect(user.firstName).toBe(userData.firstName);
            expect(user.lastName).toBe(userData.lastName);
            expect(user.emailAddress).toBe(userData.emailAddress);
            expect(bcrypt.compareSync(userData.password, user.password)).toBeTruthy();
        });

        test("should reject with a validation error if invalid data is provided", async () => {
            // Define invalid user data
            const invalidData = {
                firstName: "In",
                lastName: "valid",
                emailAddress: "nope",
                password: "invalidpass",
            };

            // Expect user creation to reject with validation error
            await expect(service.create(invalidData)).rejects.toThrow("Validation error: email address must be in the form of an email address");
        });
    });

    describe("getUserByEmail method", () => {
        test("should find a user with the provided email address", async () => {
            // Find user with stored email address
            const user = await service.getUserByEmail(userData.emailAddress);

            // Expect user to match user data
            expect(user.firstName).toBe(userData.firstName);
            expect(user.lastName).toBe(userData.lastName);
            expect(user.emailAddress).toBe(userData.emailAddress);
            expect(bcrypt.compareSync(userData.password, user.password)).toBeTruthy();
        });

        test("should reject with a 404 error if user with given email was not found", async () => {
            // Define nonexistent email
            const testEmail = "nope@example.fail";

            // Model expected error message
            const expectedMessage = `User not found with email "${testEmail}"`;

            // Expect user retrieval to reject with expected message
            await expect(service.getUserByEmail(testEmail)).rejects.toThrow(expectedMessage);
        });
    });
});
