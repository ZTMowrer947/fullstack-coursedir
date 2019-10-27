// Imports
import axios from "axios";
import Course from "../models/Course";
import ModifyCourseDTO from "../models/ModifyCourseDTO";

// Service
export default class CourseService {
    public static async getList(): Promise<Course[]> {
        const response = await axios.get("http://localhost:5000/api/courses");

        return response.data;
    }

    public static async getById(id: string): Promise<Course> {
        const response = await axios.get(
            `http://localhost:5000/api/courses/${id}`
        );

        return response.data;
    }

    public static async create(
        credentials: string,
        courseData: ModifyCourseDTO
    ): Promise<string> {
        // Decode credentials
        const decodedCredentials = atob(credentials);
        const [emailAddress, password] = decodedCredentials.split(":");

        // Make API request
        const response = await axios.post(
            "http://localhost:5000/api/courses",
            courseData,
            {
                auth: {
                    username: emailAddress,
                    password,
                },
            }
        );

        // Get location from response headers
        const location: string = response.headers.location;

        // Extract course id from location
        const lastSlashIndex = location.lastIndexOf("/");
        const courseId = location.substring(lastSlashIndex + 1);

        // Return the course id
        return courseId;
    }

    public static async update(
        credentials: string,
        id: string,
        courseData: ModifyCourseDTO
    ): Promise<void> {
        // Decode credentials
        const decodedCredentials = atob(credentials);
        const [emailAddress, password] = decodedCredentials.split(":");

        // Make API request
        await axios.put(`http://localhost:5000/api/courses/${id}`, courseData, {
            auth: {
                username: emailAddress,
                password,
            },
        });
    }

    public static async delete(credentials: string, id: string): Promise<void> {
        // Decode credentials
        const decodedCredentials = atob(credentials);
        const [emailAddress, password] = decodedCredentials.split(":");

        // Make API request
        await axios.delete(`http://localhost:5000/api/courses/${id}`, {
            auth: {
                username: emailAddress,
                password,
            },
        });
    }
}
