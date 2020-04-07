// Imports
import axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';

import User from '../models/User';
import UserDTO from '../models/UserDTO';
import {
    EmailInUseError,
    InvalidCredentialsError,
    ServerValidationError,
    UnexpectedServerError,
} from '../models/errors';

// Initialize cookie context
const cookies = new Cookies();

// API Service
export default class UserApi {
    public static getCredentials(): string | undefined {
        return cookies.get('sdbc-credentials');
    }

    public static async signIn(emailAddress: string, password: string) {
        try {
            // Make request to API to validate credentials
            const response = await axios.get<User>('/api/users', {
                auth: {
                    username: emailAddress,
                    password,
                },
            });

            // If successful, store credentials in cookie data
            cookies.set(
                'sdbc-credentials',
                btoa(`${emailAddress}:${password}`),
                {
                    domain: document.domain,
                    sameSite: 'strict',
                    // Expire in two hours
                    expires: new Date(Date.now() + 7200000),
                }
            );

            // Return user data
            return response.data;
        } catch (error) {
            // Cast error as axios error
            const axiosError = error as AxiosError;

            // If error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // If response status is 401, throw InvalidCredentialsError
            if (axiosError.response?.status === 401)
                throw new InvalidCredentialsError();

            // Otherwise, throw UnexpectedServerError
            throw new UnexpectedServerError();
        }
    }

    public static async signUp(userData: UserDTO) {
        try {
            // Make request to API
            await axios.post('/api/users', userData);
        } catch (error) {
            // Cast error as axios error
            const axiosError = error as AxiosError;

            // If error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // If response status is 400,
            if (axiosError.response?.status === 400) {
                // If response body has errors property, throw ServerValidation Error
                if (axiosError.response.data?.errors)
                    throw new ServerValidationError(
                        axiosError.response.data.errors
                    );

                // Otherwise, throw EmailInUseError
                throw new EmailInUseError();
            }

            // Otherwise, throw UnexpectedServerError
            throw new UnexpectedServerError();
        }
    }

    public static signOut() {
        return cookies.remove('sdbc-credentials', {
            domain: document.domain,
            sameSite: 'strict',
        });
    }
}
