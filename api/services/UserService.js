// Imports
const { User } = require("../models");

// Service
class UserService {
    // Find a single user by their email address
    async getUserByEmail(emailAddress) {
        // Find one user
        const user = await User.findOne({
            // Set attributes for user
            attributes: {
                // Exclude timestamps
                exclude: ["createdAt", "updatedAt"],
            },
            where: {
                // Match email addresses
                emailAddress,
            },
        });

        // If the user was found,
        if (user) {
            // Return it
            return user;
        } else {
            // Otherwise, create a not found error
            const error = new Error(`User not found with email "${emailAddress}"`);

            // Set error properties
            error.name = "NotFoundError";
            error.status = 404;

            // Throw error
            throw error;
        }
    }

    // Create new user
    async create(userData) {
        try {
            // Create User object
            const user = User.build({
                firstName: userData.firstName,
                lastName: userData.lastName,
                emailAddress: userData.emailAddress,
                password: userData.password,
            });

            // Validate and save user data
            await user.save();

            // Return the new user
            return user;
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
}

// Export
module.exports = UserService;
