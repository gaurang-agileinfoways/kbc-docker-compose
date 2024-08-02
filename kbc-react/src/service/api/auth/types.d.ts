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
  createdAt: string;
  updatedAt: string;
  __v: number;
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
