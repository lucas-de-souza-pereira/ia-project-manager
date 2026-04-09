export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
}
