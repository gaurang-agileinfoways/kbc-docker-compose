import { create } from "zustand";

import apiInstance from "../..";
import { ISignInRes } from "./types";
import { LocalStorageKeys } from "../../../utils/constants";

export type IAuthStore = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: ISignInRes;
  isSuperAdmin?: boolean;
};

interface IAuthAction {
  actions: {
    loaderChange: (status: IAuthStore["isLoading"]) => void;
    authSuccess: (payload: { data: ISignInRes }) => void;
    authFail: () => void;
  };
}

export const authStore = create<IAuthStore & IAuthAction>((set) => ({
  // initial state
  isLoading: false,
  isLoggedIn: false,
  userData: {} as ISignInRes,

  // Actions
  actions: {
    loaderChange: (status) => set((state) => ({ ...state, isLoading: status })),
    authSuccess: (payload) =>
      set((state) => {
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.data.accessToken}`;
        localStorage.setItem(
          LocalStorageKeys.authToken,
          JSON.stringify(payload.data.accessToken)
        );
        localStorage.setItem(
          LocalStorageKeys.user,
          JSON.stringify(payload.data)
        );
        return {
          ...state,
          userData: payload.data,
          isLoggedIn: true,
        };
      }),
    authFail: () =>
      set((state) => {
        delete apiInstance.defaults.headers.common["Authorization"];
        localStorage.removeItem(LocalStorageKeys.authToken);
        localStorage.removeItem(LocalStorageKeys.user);
        return {
          ...state,
          userData: {} as ISignInRes,
          isLoggedIn: false,
        };
      }),
  },
}));
