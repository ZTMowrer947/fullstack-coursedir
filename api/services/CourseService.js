// Imports
const { Course, User } = require("../models");

// Service
class CourseService {
    // Get a list of all courses
    async getList() {
        // Find all courses
        return Course.findAll({
            // Relations to include
            include: [
                // Include User
                {
                    model: User,
                    // Set attributes for course
                    attributes: {
                        // Exclude password timestamps
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
            ],
            // Set attributes for course
            attributes: {
                // Exclude timestamps
                exclude: ["createdAt", "updatedAt"],
            },
        });
    }

    // Get one course by ID
    async getById(id) {
        // Find one course with the provided ID
        const course = await Course.findByPk(id, {
            // Relations to include
            include: [
                // Include User
                {
                    model: User,
                    // Set attributes for course
                    attributes: {
                        // Exclude password timestamps
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
            ],
            // Set attributes for course
            attributes: {
                // Exclude timestamps
                exclude: ["createdAt", "updatedAt"],
            },
        });

        // If the course was found,
        if (course) {
            // Return it
            return course;
        } else {
            // Otherwise, create a not found error
            const error = new Error(`Course not found with ID "${id}"`);

            // Set error properties
            error.name = "NotFoundError";
            error.status = 404;

            // Throw error
            throw error;
        }
    }

    // Create a new course
    async create(user, courseData) {
        try {
            // Create Course object
            const course = await user.createCourse({
                title: courseData.title,
                description: courseData.description,
                estimatedTime: courseData.estimatedTime,
                materialsNeeded: courseData.materialsNeeded,
            });

            // Get course with new data
            const newCourse = this.getById(course.id)

            // Return the new course
            return newCourse;
        } catch (error) {
            // If the error caught was a validation error,
            if (error.name.endsWith("ValidationError")) {
                // Attach 400 status code to it
                error.status = 400;
            }

            // Rethrow the error
            throw error;
        }
    }

    // Update an existing course
    async update(course, updateData) {
        try {
            // Update each course property if it differs from current values
            if (updateData.title !== course.title)
                course.title = updateData.title;

            if (updateData.description !== course.description)
                course.description = updateData.description;

            if (updateData.estimatedTime !== undefined && updateData.title !== course.estimatedTime)
                course.estimatedTime = updateData.estimatedTime;

            if (updateData.materialsNeeded !== undefined && updateData.materialsNeeded !== course.materialsNeeded)
                course.materialsNeeded = updateData.materialsNeeded;

            // Validate and save updates
            await course.save();

            // Get course with association
            const updatedCourse = this.getById(course.id);

            // Return the updated course
            return updatedCourse;
        } catch (error) {
            // If the error caught was a validation error,
            if (error.name.endsWith("ValidationError")) {
                // Attach 400 status code to it
                error.status = 400;
            }

            // Rethrow the error
            throw error;
        }
    }

    // Delete a course
    async delete(course) {
        // Delete course
        await course.destroy();
    }
}

// Export
module.exports = CourseService;
