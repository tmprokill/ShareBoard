export interface AuthCookie {
  username?: string;
  email?: string;
  jwt?: string;
}

export interface AuthCookiePayload {
  jwt: string;
  username: string;
  email: string;
}
