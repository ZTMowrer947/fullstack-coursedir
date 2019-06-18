// Imports
const cors = require("cors");
const express = require("express");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middleware/auth");
const UserService = require("../services/UserService");

// CORS base options
const corsBaseOptions = {
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Location"],
    credentials: true,
};

// Express router setup
const router = express.Router();

// Middleware
router.use((req, res, next) => {
    // Provide user service
    req.userService = new UserService();

    // Pass control to next middleware/route
    next();
});

// Routes
router.route("/")
    // Enable CORS
    .all(cors(corsBaseOptions))
    // GET /api/users: Get currently authenticated user
    .get(authMiddleware, (req, res) => {
        // Remove password field
        req.user.password = undefined;

        // Response with authenticated user
        res.json(req.user);
    })
    // POST /api/users: Create user
    .post(asyncHandler(async (req, res) => {
        try {
            // Attempt to find user with email address if present
            if (req.body.emailAddress) {
                await req.userService.getUserByEmail(req.body.emailAddress);

                // If we got here, the provided email address has already been used
                // Create error
                const error = new Error("Email address has already been used by another user.");
                error.name = "BadRequestError";
                error.status = 400;

                // Throw error
                throw error;
            }
        } catch (error) {
            // Rethrow error if 400
            if (error.status === 400)
                throw error;
        }
            
        // Define user data
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: req.body.password,
        }

        // Create user
        await req.userService.create(userData);

        // Set Location header to root endpoint
        res.set("Location", "/");

        // Set status to 201 and end response
        res.status(201).end();
    }));

// Export
module.exports = router;
