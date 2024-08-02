export interface IUserData {
  authToken: string;
}

export interface ILoginApiParam {
  email: string;
  password: string;
}

export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
}

export interface ISignupApi {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface ISignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  conformPassword?: string;
  phoneNumber: string;
}

export interface IForgotPwdReq {
  email: string;
  userType: string;
}

export interface IResetPasswordReq {
  token: string;
  password: string;
  userType: string;
}

export interface IChangePasswordReq {
  password: string;
  newPassword: string;
  userType: string;
}

export interface IChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
