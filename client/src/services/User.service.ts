// Imports
import axios from "axios";
import Cookies from "js-cookie";
import User from "../models/User";

// Service
export default class UserService {
    public static getCredentials(): string | undefined {
        return Cookies.get("sdbc-credentials");
    }

    public static async signIn(
        emailAddress: string,
        password: string
    ): Promise<User> {
        // Attempt to get user data to test authentication credentials
        const response = await axios.get("http://localhost:5000/api/users", {
            auth: {
                username: emailAddress,
                password,
            },
        });

        // If successful, encode credentials in base64
        const encodedCredentials = btoa(`${emailAddress}:${password}`);

        // Store credentials in cookie data
        Cookies.set("sdbc-credentials", encodedCredentials, {
            // Expire in 2 hours
            expires: new Date(Date.now() + 2000 * 3600),
        });

        return response.data;
    }

    public static signOut(): void {
        Cookies.remove("sdbc-credentials");
    }
}
