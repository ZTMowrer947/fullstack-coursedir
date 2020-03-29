// Imports
import UserFaker from '../__testutils__/UserFaker';

// API Service Mock
export default class UserApiMock {
    private static credentials?: string;

    public static getCredentials = jest.fn(() => UserApiMock.credentials);

    public static signIn = jest.fn(
        async (emailAddress: string, password: string) => {
            // Generate mock user and reset email address
            const user = UserFaker.fakeUser();
            user.emailAddress = emailAddress;

            // Set credentials
            UserApiMock.credentials = btoa(`${emailAddress}:${password}`);

            // Return faked user
            return user;
        }
    );

    public static signOut = jest.fn(() => {
        UserApiMock.credentials = undefined;
    });
}
