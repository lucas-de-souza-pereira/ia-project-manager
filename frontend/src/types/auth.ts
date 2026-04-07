import { type User } from "./user";

export interface AuthSession {
  user: User;
  token: string;
}
