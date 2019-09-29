import User from "./User";
import CreateUserDTO from "./CreateUserDTO";

// State
interface AuthState {
    user?: User;
    loading: boolean;
    getCredentials: () => string | undefined;
    signIn: (emailAddress: string, password: string) => Promise<void>;
    signUp: (userData: CreateUserDTO) => Promise<void>;
    signOut: () => void;
}

// Export
export default AuthState;
