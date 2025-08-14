import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../constants";
import { setInvalidToken } from "../../features/auth/auth-slice"
import { store } from "./redux/store";

export function getJWTHeader(userToken: string): Record<string, string> {
  return { Authorization: `Bearer ${userToken}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosClient = axios.create(config);

axiosClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      store.dispatch(setInvalidToken());
    }
    return Promise.reject(err);
  }
);