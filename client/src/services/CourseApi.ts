// Imports
import axios, { AxiosError } from 'axios';

import Course from '../models/Course';
import { UnexpectedServerError } from '../models/errors';

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
}
