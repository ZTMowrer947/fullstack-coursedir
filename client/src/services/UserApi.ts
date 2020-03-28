// Imports
import axios from 'axios';
import Cookies from 'js-cookie';

import User from '../models/User';

// API Service
export default class UserApi {
    public static getCredentials() {
        return Cookies.get('sdbc-credentials');
    }

    public static async signIn(emailAddress: string, password: string) {
        // Make request to API to validate credentials
        const response = await axios.get<User>('/api/users', {
            auth: {
                username: emailAddress,
                password,
            },
        });

        // If successful, store credentials in cookie data
        Cookies.set('sdbc-credentials', btoa(`${emailAddress}:${password}`), {
            domain: document.domain,
            sameSite: 'strict',
            // Expire in two hours
            expires: new Date(Date.now() + 7200000),
        });

        // Return user data
        return response.data;
    }

    public static signOut() {
        return Cookies.remove('sdbc-credentials', {
            domain: document.domain,
            sameSite: 'strict',
        });
    }
}
