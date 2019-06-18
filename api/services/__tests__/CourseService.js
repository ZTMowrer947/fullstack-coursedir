// Imports
const CourseService = require("../CourseService");
const UserService = require("../UserService");
const { Course } = require("../../models");

// Test Suite
describe("Course service", () => {
    // Declare variables for test
    let service;
    let userService;
    let user;
    let course;

    // Run before all tests
    beforeAll(async () => {
        // Initialize services
        service = new CourseService();
        userService = new UserService();

        // Define test user data
        const userData = {
            firstName: "Jevil",
            lastName: "Chaos",
            emailAddress: "jevil@delta.rune",
            password: "ICANDOANYTHING", // You can tell I enjoy playing Deltarune...
        };

        // Create new user
        user = await userService.create(userData);
    });

    describe("create function", () => {
        test("should create a new course", async () => {
            // Define course data
            const courseData = {
                title: "Chaos Course",
                description: "CHAOS CHAOS CHAOS CHAOS CHAOS CHAOS CHAOS CHAOS",
            };

            // Create new course
            course = await service.create(user, courseData);

            // Expect course to match input data
            expect(course.userId).toBe(user.id);
            expect(course.title).toBe(courseData.title);
            expect(course.description).toBe(courseData.description);
            expect(course.estimatedTime).toBeNull();
            expect(course.materialsNeeded).toBeNull();
        });

        test("should reject with a validation error if invalid data was provided", async () => {
            // Define invalid course data
            const invalidData = {
                title: "How NOT to structure tests in Jest",
                estimatedTime: "1 nanosecond",
            };

            // Model expected error
            const expectedError = new Error("notNull Violation: description is a required field.");
            expectedError.name = "SequelizeValidationError";
            expectedError.status = 400;

            // Expect course creation to reject with expected error
            await expect(service.create(user, invalidData)).rejects.toThrow(expectedError);
        });
    });

    describe("getList function", () => {
        test("should retrieve a list of courses", async () => {
            // Get list of courses
            const courses = await service.getList();

            // Expect list to have one course
            expect(courses).toHaveLength(1);

            // Get first course from list
            const firstCourse = courses[0];

            // Expect course to match course created earlier
            expect(firstCourse.userId).toBe(course.userId);
            expect(firstCourse.title).toBe(course.title);
            expect(firstCourse.description).toBe(course.description);
            expect(firstCourse.estimatedTime).toBe(course.estimatedTime);
            expect(firstCourse.materialsNeeded).toBe(course.materialsNeeded);

            // Expect course user data to match user created earlier
            expect(firstCourse.user.firstName).toBe(user.firstName);
            expect(firstCourse.user.lastName).toBe(user.lastName);
            expect(firstCourse.user.emailAddress).toBe(user.emailAddress);
        });
    });

    describe("getById function", () => {
        test("should retrieve one course by its ID", async () => {
            // Get course by ID
            const testCourse = await service.getById(course.id);

            // Expect course to match course created earlier
            expect(testCourse.userId).toBe(course.userId);
            expect(testCourse.title).toBe(course.title);
            expect(testCourse.description).toBe(course.description);
            expect(testCourse.estimatedTime).toBe(course.estimatedTime);
            expect(testCourse.materialsNeeded).toBe(course.materialsNeeded);

            // Expect course user data to match user created earlier
            expect(testCourse.user.firstName).toBe(user.firstName);
            expect(testCourse.user.lastName).toBe(user.lastName);
            expect(testCourse.user.emailAddress).toBe(user.emailAddress);
        });

        test("should reject if a course with the given ID was not found", async () => {
            // Define ID of nonexistent course
            const testId = Math.pow(2, 32);

            // Model expected error
            const expectedError = new Error(`Course not found with ID "${testId}"`);
            expectedError.name = "NotFoundError";
            expectedError.status = 404;

            // Expect course retrieval to reject with expected error
            await expect(service.getById(testId)).rejects.toThrow(expectedError);
        })
    });

    describe("update function", () => {
        test("should update an existing course", async () => {
            // Define update course data
            const updatedCourseData = {
                title: course.title,
                description: course.description,
                estimatedTime: "FOREVER",
                materialsNeeded: "FUN FUN FUN FUN FUN FUN",
            };

            // Update course
            const updatedCourse = await service.update(course, updatedCourseData);

            // Expect data not specified on update data to equal older course data
            expect(updatedCourse.title).toBe(course.title);
            expect(updatedCourse.description).toBe(course.description);
            expect(updatedCourse.userId).toBe(course.userId);
            expect(updatedCourse.user.firstName).toBe(user.firstName);
            expect(updatedCourse.user.lastName).toBe(user.lastName);
            expect(updatedCourse.user.emailAddress).toBe(user.emailAddress);

            // Expect updated data to equal update input data
            expect(updatedCourse.estimatedTime).toBe(updatedCourseData.estimatedTime);
            expect(updatedCourse.materialsNeeded).toBe(updatedCourseData.materialsNeeded);

            // Store updated course for later tests
            course = updatedCourse;
        });

        test("should reject with a validation error if invalid data was provided", async () => {
            // Define invalid course data
            const invalidData = {
                title: "",
                description: course.description,
            };

            // Model expected error
            const expectedError = new Error("Validation error: title is a required field");
            expectedError.name = "SequelizeValidationError";
            expectedError.status = 400;

            // Expect course creation to reject with expected error
            await expect(service.update(course, invalidData)).rejects.toThrow(expectedError);
        });
    });

    describe("delete function", () => {
        test("should delete a course", async () => {
            // Model expected getById error
            const expectedError = new Error(`Course not found with ID "${course.id}"`)
            expectedError.name = "NotFoundError";
            expectedError.status = 404;

            // Delete course
            await service.delete(course);

            // Expect rejection when trying to find course by ID
            expect(service.getById(course.id)).rejects.toEqual(expectedError);
        });
    });
});