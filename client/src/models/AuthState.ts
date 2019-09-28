import User from "./User";

// State
interface AuthState {
    user?: User;
    loading: boolean;
    getCredentials: () => string | undefined;
    signIn: (emailAddress: string, password: string) => Promise<void>;
    signOut: () => void;
}

// Export
export default AuthState;
