// Imports
const bcrypt = require("bcryptjs");
const request = require("supertest");
const app = require("../../app");

// Test Suite
describe("/api/v1/courses", () => {
    // Declare variables for tests
    let userCredentials, user, courseId, courseData;

    // Run before all tests
    beforeAll(async () => {
        // Define user data
        userCredentials = {
            emailAddress: "exampleton@test.tld",
            password: "example",
        };

        userData = {
            ...userCredentials,
            firstName: "Examply",
            lastName: "Exampleton",
        };

        // Create new user
        const userCreateResponse = await request(app)
            .post("/api/users")
            .send(userData);

        // Throw error if response status indicates an error
        if (userCreateResponse.status >= 400)
            throw new Error("User creation returned error response, cannot proceed with course route tests.");

        // Retrive newly created user by email address
        const userGetResponse = await request(app)
            .get("/api/users")
            .auth(userCredentials.emailAddress, userCredentials.password);

        // Throw error if response status indicates an error
        if (userGetResponse.status >= 400)
            throw new Error("User retrival returned error response, cannot proceed with course route tests.");

        // Store user for test usage
        user = userGetResponse.body;

        // Define course data
        courseData = {
            title: "How to write tests using Jest",
            description: "In this course, you'll learn how to write tests for your JavaScript code using the Jest testing framework.",
        };
    });

    describe("POST method", () => {
        test("should create a new course, owned by the authenticated user", async () => {
            // Create course
            const response = await request(app)
                .post("/api/courses")
                .auth(userCredentials.emailAddress, userCredentials.password)
                .send(courseData);

            // Expect a 201 Created Response
            expect(response.status).toBe(201);

            // Expect Location header to be set correctly
            expect(response.headers.location).toEqual(expect.stringMatching(/^\/api\/courses\/\d+$/));

            // Get location of new course
            const location = response.headers.location

            // Get last index of "/" in location
            const lastSlashIndex = location.lastIndexOf("/");

            // Get course ID from location
            courseId = parseInt(location.substring(lastSlashIndex + 1));

            // Expect courseId not to be NaN (not a number)
            expect(isNaN(courseId)).toBe(false);
        });

        test("should return a 400 error when given invalid data", async () => {
            // Define invalid course data
            const invalidData = {
                title: "How not to test Express endpoints",
            };

            // Attempt to create course
            const response = await request(app)
                .post("/api/courses")
                .auth(userCredentials.emailAddress, userCredentials.password)
                .send(invalidData);

            // Model expected error
            const expectedError = {
                error: "Bad Request",
                message: "notNull Violation: description is a required field.",
            }

            // Expect a 400 response
            expect(response.status).toBe(400);

            // Expect response body to equal expected error
            expect(response.body).toStrictEqual(expectedError);
        });
    });

    describe("GET method", () => {
        test("should retrieve a list of all courses", async () => {
            // Get list of courses
            const response = await request(app)
                .get("/api/courses");

            // Expect a 200 OK Response
            expect(response.status).toBe(200);

            // Find course with ID matching the one stored earlier
            const testCourse = response.body.find(course => course.id === courseId);

            // Expect test course to have been found
            expect(testCourse).not.toBeFalsy();

            // Expect test course to match input data
            expect(testCourse.title).toBe(courseData.title);
            expect(testCourse.description).toBe(courseData.description);
            expect(testCourse.estimatedTime).toBeNull();
            expect(testCourse.materialsNeeded).toBeNull();

            // Expect test course to be owned by test user
            expect(testCourse.userId).toBe(user.id);
            expect(testCourse.user.firstName).toBe(user.firstName);
            expect(testCourse.user.lastName).toBe(user.lastName);
            expect(testCourse.user.emailAddress).toBe(user.emailAddress);
        });
    });

    describe("/:id", () => {
        // Declare variables for ID endpoint tests
        let user2Credentials;

        beforeAll(async () => {
            // Define user 2 credentials
            user2Credentials = {
                emailAddress: "mallory@example.tld",
                password: "hahaha",
            }

            // Define user 2 data
            const userData = {
                ...user2Credentials,
                firstName: "Mallory",
                lastName: "Mallet",
            };

            // Create second user
            await request(app)
                .post("/api/users")
                .send(userData);
        })

        describe("GET method", () => {
            test("should return a course with the provided ID", async () => {
                // Get one course
                const response = await request(app)
                    .get(`/api/courses/${courseId}`);

                // Expect a 200 OK response
                expect(response.status).toBe(200);

                // Get course from response body
                const course = response.body;

                // Expect course to match course input data
                expect(course.title).toBe(courseData.title);
                expect(course.description).toBe(courseData.description);
                expect(course.estimatedTime).toBeNull();
                expect(course.materialsNeeded).toBeNull();

                // Expect test course to be owned by test user
                expect(course.userId).toBe(user.id);
                expect(course.user.firstName).toBe(user.firstName);
                expect(course.user.lastName).toBe(user.lastName);
                expect(course.user.emailAddress).toBe(user.emailAddress);
            });

            test("should return a 404 error if a course with the provided ID isn't found", async () => {
                // Define ID of nonexistent course
                const testId = Math.pow(2, 32);

                // Attempt to get one course
                const response = await request(app)
                    .get(`/api/courses/${testId}`);

                // Model expected error
                const expectedError = {
                    error: "Not Found",
                    message: `Course not found with ID "${testId}"`,
                };

                // Expect a 404 response
                expect(response.status).toBe(404);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });
        });

        describe("PUT method", () => {
            test("should update a course", async () => {
                // Define new course data
                courseData = {
                    title: "liveJ gnisu stset etirw ot woH",
                    description: "CHAOSCHAOSCHAOS",
                    estimatedTime: "ALL OF ETERNITY",
                    materialsNeeded: "FUN FUN",
                };

                // Update course
                const response = await request(app)
                    .put(`/api/courses/${courseId}`)
                    .auth(userCredentials.emailAddress, userCredentials.password)
                    .send(courseData);


                // Expect a 204 Response
                expect(response.status).toBe(204);

                // Retrieve the updated course
                const courseGetResponse = await request(app)
                    .get(`/api/courses/${courseId}`);

                // Expect a 200 Response
                expect(courseGetResponse.status).toBe(200);

                // Get course from response body
                const course = courseGetResponse.body;

                // Expect course to have updated information
                expect(course.title).toBe(courseData.title);
                expect(course.description).toBe(courseData.description);
                expect(course.estimatedTime).toBe(courseData.estimatedTime);
                expect(course.materialsNeeded).toBe(courseData.materialsNeeded);

                // Expect test course to be owned by test user
                expect(course.userId).toBe(user.id);
                expect(course.user.firstName).toBe(user.firstName);
                expect(course.user.lastName).toBe(user.lastName);
                expect(course.user.emailAddress).toBe(user.emailAddress);
            });

            test("should return a 400 error when given invalid data", async () => {
                // Define invalid course data
                const invalidData = {
                    title: "",
                    description: "This course is one that should not be created if validation works correctly.",
                };
    
                // Attempt to create course
                const response = await request(app)
                    .put(`/api/courses/${courseId}`)
                    .auth(userCredentials.emailAddress, userCredentials.password)
                    .send(invalidData);

                // Model expected error
                const expectedError = {
                    error: "Bad Request",
                    message: "Validation error: title is a required field",
                }
    
                // Expect a 400 response
                expect(response.status).toBe(400);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });

            test("should return a 404 error if a course with the provided ID isn't found", async () => {
                // Define ID of nonexistent course
                const testId = Math.pow(2, 32);

                // Attempt to get one course
                const response = await request(app)
                    .put(`/api/courses/${testId}`)
                    .auth(userCredentials.emailAddress, userCredentials.password);

                // Model expected error
                const expectedError = {
                    error: "Not Found",
                    message: `Course not found with ID "${testId}"`,
                };

                // Expect a 404 response
                expect(response.status).toBe(404);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });

            test("should return a 403 error if a user tries to update a course belonging to another user", async () => {
                // Define new course data
                courseData = {
                    title: "liveJ gnisu stset etirw ot woH",
                    description: "CHAOSCHAOSCHAOS",
                    estimatedTime: "ALL OF ETERNITY",
                    materialsNeeded: "FUN FUN",
                };

                // Attempt to update course
                const response = await request(app)
                    .put(`/api/courses/${courseId}`)
                    .auth(user2Credentials.emailAddress, user2Credentials.password)
                    .send(courseData);

                // Model expected error
                const expectedError = {
                    error: "Forbidden",
                    message: "You may not modify the requested course because you do not own the course.",
                };

                // Expect a 403 response
                expect(response.status).toBe(403);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });
        });

        describe("DELETE method", () => {
            test("should return a 404 error if a course with the provided ID isn't found", async () => {
                // Define ID of nonexistent course
                const testId = Math.pow(2, 32);

                // Attempt to get one course
                const response = await request(app)
                    .delete(`/api/courses/${testId}`)
                    .auth(userCredentials.emailAddress, userCredentials.password);

                // Model expected error
                const expectedError = {
                    error: "Not Found",
                    message: `Course not found with ID "${testId}"`,
                };

                // Expect a 404 response
                expect(response.status).toBe(404);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });

            test("should return a 403 error if a user tries to delete a course belonging to another user", async () => {
                // Attempt to delete course
                const response = await request(app)
                    .delete(`/api/courses/${courseId}`)
                    .auth(user2Credentials.emailAddress, user2Credentials.password)

                // Model expected error
                const expectedError = {
                    error: "Forbidden",
                    message: "You may not modify the requested course because you do not own the course.",
                };

                // Expect a 403 response
                expect(response.status).toBe(403);

                // Expect response body to equal expected error
                expect(response.body).toStrictEqual(expectedError);
            });

            test("should delete a course", async () => {
                // Delete course
                const response = await request(app)
                    .delete(`/api/courses/${courseId}`)
                    .auth(userCredentials.emailAddress, userCredentials.password);

                // Expect a 204 response
                expect(response.status).toBe(204);

                // Attempt to find course by ID
                const courseGetResponse = await request(app)
                    .get(`/api/course/${courseId}`);

                // Expect a 404 response
                expect(courseGetResponse.status).toBe(404);
            });
        });
    });
})