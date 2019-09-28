import User from "./User";

// Model
interface Course {
    id: string;
    title: string;
    estimatedTime: string | null;
    materialsNeeded: string | null;
    creator: User;
}

// Export
export default Course;
