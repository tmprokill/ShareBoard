import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApiService } from "./auth-api-service";
import { ApiResponse } from "../../../common/models/api-responses";
import { LoginResponse } from "../models/login-response";
import { authorize } from "../auth-slice";
import { LoginModel } from "../models/login-model";
import { RegisterModel } from "../models/register-model";
import { toast } from "react-toastify";

export function useLoginMutation() {
  const authApiService = new AuthApiService();
  return useMutation({
    mutationFn: (data: LoginModel) =>
      authApiService.loginAsync({ login: data.login, password: data.password }),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if(response.success){
        authorize({
          jwt: response.data!.jwt,
          username: response.data!.username,
          email: response.data!.email,
        });
      }
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
    onSuccess: () => {
      toast.success("Check the inbox for the registration");
    },
  });
}
