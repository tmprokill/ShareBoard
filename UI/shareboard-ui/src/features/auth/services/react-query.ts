import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApiService } from "./auth-api-service";
import {
  ApiResponse,
  ProblemDetails,
} from "../../../common/models/api-responses";
import { LoginResponse } from "../models/login";
import { authorize } from "../auth-slice";
import { LoginModel } from "../models/login";
import { RegisterModel } from "../models/register";
import { toast } from "react-toastify";
import { store } from "../../../common/app/redux/store";

export function useLoginMutation() {
  const authApiService = new AuthApiService();
  return useMutation({
    mutationFn: (data: LoginModel) =>
      authApiService.loginAsync({ login: data.login, password: data.password }),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if (response.success) {
        store.dispatch(
          authorize({
            jwt: response.data!.token,
            username: response.data!.userName,
            email: response.data!.email,
          })
        );
      }
    },
    onError: (error: ProblemDetails) => {
      toast.error(error.detail);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const authApiService = new AuthApiService();
  return useMutation({
    mutationFn: () => authApiService.logoutAsync(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useRegisterMutation() {
  const authApiService = new AuthApiService();

  return useMutation({
    mutationFn: (data: RegisterModel) =>
      authApiService.registerAsync({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    onSuccess: (response: ApiResponse<null>) => {
      toast.success(response.message);
    },
    onError: (error: ProblemDetails) => {
      toast.error(error.detail);
    },
  });
}
