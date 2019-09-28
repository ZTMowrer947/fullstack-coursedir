// Imports
import axios from "axios";
import Course from "../models/Course";

// Service
export default class CourseService {
    public static async getList(): Promise<Course[]> {
        const response = await axios.get("http://localhost:5000/api/courses");

        return response.data;
    }
}
