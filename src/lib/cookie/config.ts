export const credentialCookieName = 'sdbc-credentials';

export const credentialCookieOpts: Cookies.CookieAttributes = {
  sameSite: 'strict',
  expires: 7,
  secure: import.meta.env.PROD,
};
