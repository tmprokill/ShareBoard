export interface LoginModel {
  login: string;
  password: string;
}

export interface LoginResponse{
    email: string,
    username: string,
    jwt: string
}