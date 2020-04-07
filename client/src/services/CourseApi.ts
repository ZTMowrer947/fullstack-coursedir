// Imports
import axios, { AxiosError } from 'axios';

import Course from '../models/Course';
import CourseDTO from '../models/CourseDTO';
import {
    UnexpectedServerError,
    ServerValidationError,
    NotFoundError,
    ForbiddenError,
} from '../models/errors';

// API Service
export default class CourseApi {
    public static async getList() {
        try {
            // Make request to API
            const response = await axios.get<Course[]>('/api/courses');

            // Return response data
            return response.data;
        } catch (error) {
            // If any error occurs, throw UnexpectedServerError
            throw new UnexpectedServerError();
        }
    }

    public static async get(id: string) {
        try {
            // Make request to API
            const response = await axios.get<Course>(`/api/courses/${id}`);

            // If successful, return response data
            return response.data;
        } catch (error) {
            // Cast error as AxiosError
            const axiosError = error as AxiosError;

            // If the error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // If response status is 404, return undefined
            if (axiosError.response?.status === 404) return undefined;

            // Otherwise, throw UnexpectedServerError
            throw new UnexpectedServerError();
        }
    }

    public static async create(
        credentials: string,
        courseData: CourseDTO
    ): Promise<string> {
        try {
            // Decode credentials
            const [emailAddress, password] = atob(credentials).split(':');

            // Make request to API
            const response = await axios.post('/api/courses', courseData, {
                auth: {
                    username: emailAddress,
                    password,
                },
            });

            // Get location header
            const location = response.headers.location;

            // Extract course id from location
            const lastSlashIndex = location.lastIndexOf('/');
            const courseId = location.substring(lastSlashIndex + 1);

            // Return the course id
            return courseId;
        } catch (error) {
            // Cast error as AxiosError
            const axiosError = error as AxiosError;

            // If the error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // If response status is 400, throw ServerValidationError
            if (axiosError.response?.status === 400) {
                throw new ServerValidationError(
                    axiosError.response.data.errors
                );
            }

            // Otherwise, throw UnexpectedServerError
            throw new UnexpectedServerError();
        }
    }

    public static async update(
        credentials: string,
        id: string,
        courseData: CourseDTO
    ): Promise<void> {
        try {
            // Decode credentials
            const [emailAddress, password] = atob(credentials).split(':');

            // Make request to API
            await axios.put(`/api/courses/${id}`, courseData, {
                auth: {
                    username: emailAddress,
                    password,
                },
            });
        } catch (error) {
            // Cast error as AxiosError
            const axiosError = error as AxiosError;

            // If the error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // Otherwise, consider response status
            switch (axiosError.response?.status) {
                // 404 Not Found
                case 404:
                    // Throw NotFoundError
                    throw new NotFoundError();

                // 403 Forbidden
                case 403:
                    // Throw ForbiddenError
                    throw new ForbiddenError();

                // 400 Bad Request
                case 400:
                    // Throw ServerValidationError
                    throw new ServerValidationError(
                        axiosError.response.data.errors
                    );

                // Any other error
                default:
                    // Throw UnexpectedServerError
                    throw new UnexpectedServerError();
            }
        }
    }

    public static async delete(credentials: string, id: string): Promise<void> {
        try {
            // Decode credentials
            const [emailAddress, password] = atob(credentials).split(':');

            // Make request to API
            await axios.delete(`/api/courses/${id}`, {
                auth: {
                    username: emailAddress,
                    password,
                },
            });
        } catch (error) {
            // Cast error as AxiosError
            const axiosError = error as AxiosError;

            // If the error is not an axios error, rethrow error
            if (!axiosError.isAxiosError) throw error;

            // Otherwise, consider response status
            switch (axiosError.response?.status) {
                // 404 Not Found
                case 404:
                    // Throw NotFoundError
                    throw new NotFoundError();

                // 403 Forbidden
                case 403:
                    // Throw ForbiddenError
                    throw new ForbiddenError();

                // Any other error
                default:
                    // Throw UnexpectedServerError
                    throw new UnexpectedServerError();
            }
        }
    }
}
