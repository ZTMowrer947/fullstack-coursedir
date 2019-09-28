// Imports
import axios from "axios";
import ValidationError from "../ValidationError";

// Module
export default (() => {
    // Set base URL for request
    const baseUrl = "http://localhost:5000/api/users";

    // Export functions
    return {
        signIn: async (emailAddress, password) => {
            // Declare variable to hold credentials
            let credentials = `${emailAddress}:${password}`;

            // Encode credentials using Base64
            credentials = Buffer.from(credentials).toString("base64");

            // Get user from API with credentials
            const response = await axios.get(baseUrl, {
                headers: {
                    authorization: `Basic ${credentials}`,
                },
            });

            // Return the recieved user and credentials
            return [response.data, credentials];
        },

        createUser: async (userData) => {
            try {
                // Create user through API
                await axios.post(baseUrl, userData);
            } catch (error) {
                // If a response is attached and is of status code 400,
                if (error.response && error.response.status === 400) {
                    // Create validation error for user data
                    const validationError = new ValidationError(error.response.data.message, userData);

                    // Throw error
                    throw validationError
                }

                // Otherwise, rethrow error
                throw error;
            }
        },
    };
})();
