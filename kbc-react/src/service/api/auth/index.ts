import {
  IChangePasswordReq,
  IForgotPwdReq,
  IResetPasswordReq,
  ISignInReq,
  ISignInRes,
} from "./types";
import apiInstance from "../..";
import { ApiEndPoints } from "../../../utils/constants";
import { IApiSuccess } from "../../../utils/Types";
import { authStore } from "../../store/auth";
import { ISignupApi } from "../../store/auth/types";
import { useRequest } from "../../hooks";

const { actions } = authStore.getState();

export const authAPI = {
  // SignIn
  useSignIn() {
    return useRequest({
      mutationKey: ["auth", "signin"],
      mutationFn: async (data: ISignInReq): Promise<IApiSuccess<ISignInRes>> =>
        apiInstance
          .post(ApiEndPoints.auth.signIn, data)
          .then((response) => {
            actions.authSuccess(response);
            return response;
          })
          .catch((err) => {
            throw err.response.data;
          }),
    });
  },

  async register(data: ISignupApi): Promise<IApiSuccess<object>> {
    return apiInstance
      .post(ApiEndPoints.auth.register, data)
      .then((response) => {
        actions.authSuccess(response);
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async forgotPassword(
    data: IForgotPwdReq
  ): Promise<IApiSuccess<Record<string, string>>> {
    return apiInstance
      .post(ApiEndPoints.auth.forgotPassword, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async resetPassword(
    data: IResetPasswordReq
  ): Promise<IApiSuccess<Record<string, string>>> {
    return apiInstance
      .post(ApiEndPoints.auth.resetPassword, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async changePassword(
    data: IChangePasswordReq
  ): Promise<IApiSuccess<Record<string, string>>> {
    return apiInstance
      .post(ApiEndPoints.auth.changePassword, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  },

  async logout() {
    actions.authFail();
  },
};
