import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { authStore } from './store/auth';
import { API_BASE } from '../utils/constants';



const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE
});

export function setAxiosInterceptor() {
  apiInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // It's used to intercept all the axios api response
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (err) => {
      if (err.response) {
        if (err.response.status === 403) {
          authStore.getState().actions.authFail();
          return Promise.reject(err);
        } else {
          return Promise.reject(err);
        }
      } else if (err.request) {
        const apiError = {
          response: {
            data: {
              message: "Something went wrong, Please try again later!!!",
            },
          },
        };
        return Promise.reject(apiError);
      }
    }
  );
}

export default apiInstance;
