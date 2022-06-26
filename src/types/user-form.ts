export interface UserFormSignup {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export interface UserFormSignIn {
  username: string;
  password: string;
}

export interface UserFormUpdate {
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  repeatNewPassword: string;
}

