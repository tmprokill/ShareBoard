export abstract class CookieConstants {
  public static COOKIE_JWT = "jwt";
  public static COOKIE_USERNAME = "username";
  public static COOKIE_EMAIL = "email";
}

export abstract class AppSettingDefaultConstants{
  public static DEFAULT_LANGUAGE = 'en';
  public static FALLBACK_LANGUAGE = 'en';
  public static DEFAULT_THEME = 'light';
}

export abstract class APIConstants{
  public static SUCCESS_RESPONSE = "ok";
  public static ERROR_RESPONSE = "error";
}

export abstract class Routes {
  public static LOGIN = "/login";
  public static REGISTER = "/register";
  public static HOME = "/"
}

export const baseUrl = 'http://localhost:3030';