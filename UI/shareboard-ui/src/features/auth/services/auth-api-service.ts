import { axiosClient, getJWTHeader } from "../../../common/app/axios";
import { ApiResponse } from "../../../common/models/api-response";
import { LoginResponse } from "../models/login-response";
import { LoginModel } from "../models/login-model";
import { AuthCookieService } from "./auth-cookie-service";
import { RegisterModel } from "../models/register-model";

export class AuthApiService {
  private controller = "/auth";

  async login(loginModel: LoginModel): Promise<ApiResponse<LoginResponse>> {
    const res = await axiosClient.post<ApiResponse<LoginResponse>>(
      this.controller + "login",
      loginModel
    );

    return res.data;
  }

  async register(registerModel: RegisterModel): Promise<ApiResponse<null>> {
    const res = await axiosClient.post<ApiResponse<null>>(
      this.controller + "register",
      registerModel
    );

    return res.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const res = await axiosClient.get<ApiResponse<null>>(
      this.controller + "logout",
      {
        headers: {
          ...getJWTHeader(AuthCookieService.getAuthCookies().jwt ?? ""),
        },
      }
    );

    return res.data;
  }
}
