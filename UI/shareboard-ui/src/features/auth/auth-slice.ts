import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppUser } from "./models/appuser";
import { AuthCookieService } from "./services/auth-cookie-service";
import { AuthCookie } from "./models/authCookie";

interface AuthState {
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
    login(
      state,
      action: PayloadAction<{ jwt: string; username: string; email: string }>
    ) {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
      };
      AuthCookieService.setAuthCookies({
        jwt: action.payload.jwt,
        username: action.payload.username,
        email: action.payload.email,
      });
    },
    logout(state) {
      state.user = undefined;
      state.isAuthenticated = false;
      AuthCookieService.removeAuthCookies();
    },
  },
});

export default authSlice.reducer;
