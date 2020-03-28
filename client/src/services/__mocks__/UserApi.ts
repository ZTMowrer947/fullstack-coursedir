// Imports
import UserFaker from '../__testutils__/UserFaker';

// API Service Mock
export default class UserApiMock {
    private static credentials?: string;

    public static getCredentials() {
        return this.credentials;
    }

    public static async signIn(emailAddress: string, password: string) {
        // Generate mock user and reset email address
        const user = UserFaker.fakeUser();
        user.emailAddress = emailAddress;

        // Set credentials
        this.credentials = btoa(`${emailAddress}:${password}`);

        // Return faked user
        return user;
    }

    public static signOut() {
        this.credentials = undefined;
    }
}
