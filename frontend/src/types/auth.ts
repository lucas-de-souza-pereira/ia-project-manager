import { type User } from "./user";

export interface AuthSession {
  user: User;
  token: string;
}

export interface AuthApiResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
