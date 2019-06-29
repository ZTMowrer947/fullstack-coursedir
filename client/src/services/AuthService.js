// Imports
import axios from "axios";
import CookieContext from "universal-cookie";

// Module
export default (() => {
    // Initialize cookie context
    const cookieContext = new CookieContext();

    // Set cookie options
    const cookieOptions = {
        // Set domain and path
        domain: "localhost",
        path: "/",

        // Expire after 2 hours
        maxAge: 60 * 60 * 2,

        // Set secure flag when in production
        secure: process.env.NODE_ENV === "production",

        // Strict Same-Site policy
        sameSite: "strict",
    };

    // Set base URL for request
    const baseUrl = "http://localhost:5000/api/courses";

    // Export functions
    return {
        getCredentials: () => cookieContext.get("sdbc-credentials") || null,

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

            // If the request succeeds, store credentials for later use
            cookieContext.set("sdbc-credentials", credentials, cookieOptions);

            // Return the recieved user and credentials
            return [response.data, credentials];
        },

        signOut: () => {
            // Clear credential cookie
            cookieContext.remove("sdbc-credentials", cookieOptions);
        },
    };
})();
