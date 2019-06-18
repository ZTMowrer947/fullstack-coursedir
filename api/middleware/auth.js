// Imports
const basicAuth = require("basic-auth");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// Middleware
const authMiddleware = asyncHandler(async (req, res, next) => {
    // Get authorization credentials
    const credentials = basicAuth(req);

    // If no credentials were provided,
    if (!credentials) {
        // Create Unauthorized error
        const error = new Error("Authentication is required for this route.");
        error.name = "NotAuthorizedError";
        error.status = 401;

        // Set WWW-Authenticate Header
        res.set("WWW-Authenticate", "Basic");

        // Pass error to error handlers
        return next(error);
    }

    // Attempt to find user with credentials
    const user = await req.userService.getUserByEmail(credentials.name);

    // Compare user password to credential password
    const passwordsMatch = bcrypt.compareSync(credentials.pass, user.password);

    // If the passwords do not match,
    if (!passwordsMatch) {
        // Create Unauthorized error
        const error = new Error("Incorrect password.");
        error.name = "NotAuthorizedError";
        error.status = 401;

        // Set WWW-Authenticate Header
        res.set("WWW-Authenticate", "Basic");

        // Pass error to error handlers
        return next(error);
    } else {
        // If they do, attach user to request object
        req.user = user;

        // Pass control to next middleware/route
        next();
    }
});

// Export
module.exports = authMiddleware;
