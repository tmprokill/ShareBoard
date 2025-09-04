import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "./models/appuser";
import { AuthCookieService } from "./services/auth-cookie-service";
import { AuthCookie } from "./models/authCookie";

export interface AuthState {
  isAuthenticated: boolean;
  user?: AppUser;
}

const initialState: AuthState = (() => {
  const authCookie: AuthCookie = AuthCookieService.getAuthCookies();

  let user: AppUser | undefined;
  let isAuthenticated = false;

  if (
    authCookie.jwt !== undefined &&
    authCookie.username !== undefined &&
    authCookie.email !== undefined
  ) {
    isAuthenticated = true;
    user = {
      username: authCookie.username,
      email: authCookie.email,
      jwt: authCookie.jwt
    };
  } else {
    AuthCookieService.removeAuthCookies();
  }

  return { isAuthenticated, user };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize(
      state,
      action: PayloadAction<{ jwt: string; username: string; email: string }>
    ) {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        jwt: action.payload.jwt
      };
      AuthCookieService.setAuthCookies({
        jwt: action.payload.jwt,
        username: action.payload.username,
        email: action.payload.email,
      });
    },
    unauthorize(state) {
      state.user = undefined;
      state.isAuthenticated = false;
      AuthCookieService.removeAuthCookies();
    },
  },
});

export default authSlice.reducer;

export const { unauthorize, authorize } = authSlice.actions;