import Cookies from 'js-cookie';

import getUser, { User } from '@/queries/getUser.ts';

const credentialCookieName = 'sdbc-credentials';
const credentialCookieOptions: Cookies.CookieAttributes = {
  sameSite: 'strict',
  secure: import.meta.env.PROD && window.isSecureContext,
};

class AuthManager {
  #user: User | null = null;

  #getCredentials(): [string, string] | null {
    const cookie = Cookies.get(credentialCookieName);

    if (!cookie) return null;

    const segments = atob(cookie).split(':');

    if (segments.length !== 2) return null;

    return [segments[0], segments[1]];
  }

  #encodeCredentials(emailAddress: string, password: string): string {
    return btoa(`${emailAddress}:${password}`);
  }

  get hasCredentials(): boolean {
    return !!this.#getCredentials();
  }

  get user(): User | null {
    return this.#user;
  }

  get isSignedIn(): boolean {
    return !!this.user;
  }

  signOut() {
    Cookies.remove(credentialCookieName, credentialCookieOptions);
    this.#user = null;
  }

  async signIn(emailAddress: string, password: string): Promise<User | null> {
    const credentials = this.#encodeCredentials(emailAddress, password);

    const user = await getUser(emailAddress, password);

    if (user) {
      if (!this.hasCredentials) {
        Cookies.set(credentialCookieName, credentials, credentialCookieOptions);
      }
      this.#user = user;
    } else if (this.hasCredentials) {
      this.signOut();
    }

    return user;
  }

  async signInFromCookie(): Promise<User | null> {
    if (this.hasCredentials) {
      const [emailAddress, password] = this.#getCredentials()!;

      return this.signIn(emailAddress, password);
    }

    return null;
  }
}

const authManager = new AuthManager();

export default authManager;
