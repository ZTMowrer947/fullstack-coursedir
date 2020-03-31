// Imports
import axios from 'axios';
import Cookies from 'js-cookie';

import User from '../models/User';
import UserDTO from '../models/UserDTO';

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

    public static async signUp(userData: UserDTO) {
        // Make request to API
        await axios.post('/api/users', userData);
    }

    public static signOut() {
        return Cookies.remove('sdbc-credentials', {
            domain: document.domain,
            sameSite: 'strict',
        });
    }
}
