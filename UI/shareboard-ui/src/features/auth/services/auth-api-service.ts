import { axiosClient, getJWTHeader } from "../../../common/app/axios";
import { ApiResponse } from "../../../common/models/api-responses";
import { LoginResponse } from "../models/login";
import { LoginModel } from "../models/login";
import { AuthCookieService } from "./auth-cookie-service";
import { RegisterModel } from "../models/register";
import { apiRequest } from "../../../common/services/api-request-handler";

export class AuthApiService {
  private controller = "/auth";

  async loginAsync(loginModel: LoginModel): Promise<ApiResponse<LoginResponse>> {
    const res = await apiRequest<LoginResponse>(
      {
        method: 'post',
        url: this.controller + "/login",
        data: loginModel
      }
    );

    return res;
  }

  async registerAsync(registerModel: RegisterModel): Promise<ApiResponse<null>> {
    const res = await apiRequest<null>(
      {
        method: 'post',
        url: this.controller + "/register",
        data: registerModel
      }
    );

    return res;
  }

  async logoutAsync(): Promise<ApiResponse<null>> {
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
