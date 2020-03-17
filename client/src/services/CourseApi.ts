// Imports
import axios, { AxiosError } from 'axios';

import Course from '../models/Course';

// API Service
export default class CourseApi {
    public static async getList() {
        // Make request to API
        const response = await axios.get<Course[]>('/api/courses');

        // Return response data
        return response.data;
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

            // If the error is not an axios error, or not a 404 error,
            if (
                !axiosError.isAxiosError ||
                axiosError.response?.status !== 404
            ) {
                // Rethrow error
                throw error;
            }

            // Otherwise, return undefined
            return undefined;
        }
    }
}
