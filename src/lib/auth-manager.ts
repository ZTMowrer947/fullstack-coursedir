import Cookies from 'js-cookie';

import type { UserCredentials } from '@/entities/user.ts';

/**
 * Manages the storage of user credentials
 */
export class AuthManager {
  /**
   * The name of the cookie to store the credentials in.
   * @private
   */
  static readonly #cookieName = 'sdbc-credentials';

  /**
   * The options to store the credential cookie with.
   * @private
   */
  static readonly #cookieOpts: Cookies.CookieAttributes = {
    expires: 7,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
  };

  /**
   * Attempts to retrieve the stored user credentials.
   * @returns The stored credentials if present, `undefined` if none are present.
   */
  static get credentials(): UserCredentials | undefined {
    const encoded = Cookies.get(this.#cookieName);

    return encoded ? this.decodeCredentials(encoded) : undefined;
  }

  /**
   * Encodes the given user credentials for storage.
   * @param emailAddress The email address of the user to authenticate.
   * @param password The password of the user to authenticate.
   */
  static encodeCredentials({ emailAddress, password }: UserCredentials): string {
    return btoa(`${emailAddress}:${password}`);
  }

  /**
   * Decodes the encoded credential string.
   * @returns The decoded credentials if successful, `undefined` otherwise.
   */
  static decodeCredentials(encoded: string): UserCredentials | undefined {
    const b64Regex = /^[A-Za-z0-9+\\/=]+$/;

    if (!b64Regex.test(encoded)) return undefined;

    const decoded = atob(encoded);

    if (!decoded.includes(':')) return undefined;

    const [emailAddress, ...rest] = decoded.split(':');

    const password = rest.join(':');

    return { emailAddress, password };
  }

  /**
   * Stores the given credentials for persisting across sessions.
   */
  static storeCredentials(credentials: UserCredentials) {
    Cookies.set(this.#cookieName, this.encodeCredentials(credentials), this.#cookieOpts);
  }

  /**
   * Clears any stored credentials.
   */
  static clearCredentials() {
    if (this.credentials) {
      Cookies.remove(this.#cookieName, this.#cookieOpts);
    }
  }
}
