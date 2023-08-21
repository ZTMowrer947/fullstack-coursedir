// Imports
import User from './User';

// Type
interface Course {
    id: string;
    title: string;
    description: string;
    estimatedTime?: string;
    materialsNeeded?: string;
    user: Pick<User, 'firstName' | 'lastName'>;
    userId: number;
}

// Export
export default Course;
