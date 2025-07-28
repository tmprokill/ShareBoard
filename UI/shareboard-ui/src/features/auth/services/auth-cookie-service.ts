import Cookies from "js-cookie";
import { AuthCookie, AuthCookiePayload } from "../models/authCookie";
import { CookieConstants } from "../../../constants";

export class AuthCookieService {
  public static getAuthCookies(): AuthCookie {
    const jwt = Cookies.get(CookieConstants.COOKIE_JWT);
    const username = Cookies.get(CookieConstants.COOKIE_USERNAME);
    const email = Cookies.get(CookieConstants.COOKIE_EMAIL);

    const result: AuthCookie = {
      jwt,
      username,
      email,
    };
    return result;
  }

  public static setAuthCookies(payload: AuthCookiePayload) {
    Cookies.set(CookieConstants.COOKIE_JWT, payload.jwt, { expires: 7 });
    Cookies.set(CookieConstants.COOKIE_USERNAME, payload.username, { expires: 7 });
    Cookies.set(CookieConstants.COOKIE_EMAIL, payload.email, { expires: 7 });
  }

  public static removeAuthCookies(): void {
    Cookies.remove(CookieConstants.COOKIE_JWT);
    Cookies.remove(CookieConstants.COOKIE_USERNAME);
    Cookies.remove(CookieConstants.COOKIE_EMAIL);
  }
}
