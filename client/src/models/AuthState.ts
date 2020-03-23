// Imports
import User from './User';

// Type
interface AuthState {
    user?: User;
    getCredentials: () => string | undefined;
    signIn: (emailAddress: string, password: string) => Promise<User>;
    signOut: () => void;
}

// Export
export default AuthState;
