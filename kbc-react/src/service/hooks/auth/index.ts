import { useRequest } from "..";
import { authAPI } from "../../api/auth";
import { authKeys } from "../queryKeys";

export const useForgotPassword = () => {
  return useRequest({
    mutationFn: authAPI.forgotPassword,
    mutationKey: authKeys.authForgotPsw,
  });
};

export const useResetPassword = () => {
  return useRequest({
    mutationFn: authAPI.resetPassword,
    mutationKey: authKeys.authResetPsw,
  });
};

export const useChangePassword = () => {
  return useRequest({
    mutationFn: authAPI.changePassword,
    mutationKey: authKeys.authChangePsw,
  });
};
