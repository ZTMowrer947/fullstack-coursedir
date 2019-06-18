"use strict";

// Imports
const http = require("http");
const app = require("./app");

// HTTP Server setup
const server = http.createServer(app);

// Listening on specified port
server.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});

// When recieving CTRL-C,
process.on("SIGINT", () => {
    // Display shutting down message
    console.log("Shutting down express server...");

    // Close HTTP server
    server.close(() => {
        // Display shutdown message
        console.log("Shutdown complete.");

        // Exit with success status
        process.exit(0);
    });
});
