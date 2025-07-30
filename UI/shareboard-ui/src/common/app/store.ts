import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/auth-slice";
import appSettingsReducer from "./app-settings-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appSettings: appSettingsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
