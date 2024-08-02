import { setAxiosInterceptor } from "../service";
import { authStore } from "../service/store/auth";
import { LocalStorageKeys } from "./constants";

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const { actions } = authStore.getState();

export const setupAxios = () => {
  const userStorage = localStorage.getItem(LocalStorageKeys.user);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.authToken);

  if (userStorage && tokenStorage) {
    actions.authSuccess({ data: JSON.parse(userStorage) });
  } else {
    actions.authFail();
  }
  setAxiosInterceptor();
};

export function getCurrentClass(
  isSubmitted: boolean,
  currentValue: string,
  selectedAnswer: string,
  actualAnswer?: string
) {
  if (isSubmitted === true) {
    if (currentValue === actualAnswer)
      return "bg-green-400 hover:bg-none text-black";
    if (currentValue === selectedAnswer)
      return "bg-red-400 hover:bg-none text-black";
    if (currentValue === selectedAnswer)
      return "bg-indigo-400 hover:bg-none text-black";
    return "hover:bg-none text-black";
  } else {
    return currentValue === selectedAnswer
      ? "bg-indigo-400 hover:bg-none text-black"
      : "hover:bg-indigo-100 text-gray-700";
  }
}
