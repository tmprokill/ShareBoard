export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: ProblemDetails
}

export interface ProblemDetails {
    status: number;
    title: string;
    type: string;
    detail: string;
    errors: string[];
}