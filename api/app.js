"use strict";

// Imports
const { STATUS_CODES } = require("http");
const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./routes");

// Whether or not a enable error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// Express app setup
const app = express();

// Middleware
if (!process.env.NODE_ENV.startsWith("test")) {
    app.use(morgan("dev")); // Log HTTP requests if not doing testing

}
app.use(express.urlencoded({ extended: true })) // Parse urlencoded bodies
app.use(express.json()) // Parse JSON bodies

// Routes
app.use("/api", apiRouter);

// /: Friendly welcome message
app.get('/', (req, res) => {
    // Respond with welcome message
    res.json({
        message: "Welcome to the REST API project!",
    });
});

// All other routes are a 404
app.use((req, res) => {
    // Set status to 404 and respond with "not found" message
    res.status(404).json({
        message: 'Route Not Found',
    });
});

// Error Handlers
app.use((err, req, res, next) => {
    // If we should log errors,
    if (enableGlobalErrorLogging) {
        // Log the error to the console
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    // Set error status and respond with error message
    res.status(err.status || 500).json({
        message: err.message,
        error: STATUS_CODES[res.statusCode],
    });
});

// Set port to listen on
app.set('port', process.env.PORT || 5000);

// Export
module.exports = app;
