import Cookies from "js-cookie";
import { AuthCookie, AuthCookiePayload } from "../models/authCookie";
import { CookieConstants } from "../../../common/constants";

export class AuthCookieService {
  public static getAuthCookies(): AuthCookie {
    const jwt = Cookies.get(CookieConstants.JWT);
    const username = Cookies.get(CookieConstants.USERNAME);
    const email = Cookies.get(CookieConstants.EMAIL);

    const result: AuthCookie = {
      jwt,
      username,
      email,
    };
    return result;
  }

  public static setAuthCookies(payload: AuthCookiePayload) {
    Cookies.set(CookieConstants.JWT, payload.jwt, { expires: 7 });
    Cookies.set(CookieConstants.USERNAME, payload.username, { expires: 7 });
    Cookies.set(CookieConstants.EMAIL, payload.email, { expires: 7 });
  }

  public static removeAuthCookies(): void {
    Cookies.remove(CookieConstants.JWT);
    Cookies.remove(CookieConstants.USERNAME);
    Cookies.remove(CookieConstants.EMAIL);
  }
}
