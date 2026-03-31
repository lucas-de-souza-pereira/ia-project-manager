export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface AuthSession {
  user: User;
  token: string;
}
