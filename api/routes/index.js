// Imports
const express = require("express");
const userRouter = require("./users");
const courseRouter = require("./courses");

// Express router setup
const router = express.Router();

// Routes
router.use("/users", userRouter);
router.use("/courses", courseRouter);

// Export
module.exports = router;
