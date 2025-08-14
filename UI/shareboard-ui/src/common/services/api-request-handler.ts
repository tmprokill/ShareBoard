import { AxiosRequestConfig, AxiosError } from "axios";
import { axiosClient } from "../app/axios";
import { ApiResponse, ProblemDetails } from "../models/api-responses";

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await axiosClient.request<ApiResponse<T>>(config);

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (err) {
    const error = err as AxiosError;

    let apiError: ProblemDetails = {
      status: 500,
      title: "Internal Server Error",
      type: "Application.Error",
      detail: "It's over",
      errors: [],
    };

    if (error.response?.data) {
      const data = error.response.data as ProblemDetails;
      
      // Handle ProblemDetails format
      if (data.title || data.detail) {
        apiError = {
          status: data.status,
          title: data.title,
          type: data.type,
          detail:  data.detail,
          errors: data.errors
        };
      }
    }

    return {
      success: false,
      message: apiError.detail || apiError.title || "Unknown error",
      error: apiError
    };
  }
}