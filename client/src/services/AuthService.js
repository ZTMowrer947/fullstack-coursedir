// Imports
import axios from "axios";

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

        signOut: () => {
            // Clear credential cookie
            // cookieContext.remove("sdbc-credentials", cookieOptions);
        },
    };
})();
