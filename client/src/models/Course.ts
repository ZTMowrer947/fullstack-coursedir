// Imports
import User from './User';

// Type
interface Course {
    id: string;
    title: string;
    description: string;
    estimatedTime?: string;
    materialsNeeded?: string;
    creator: User;
}

// Export
export default Course;
