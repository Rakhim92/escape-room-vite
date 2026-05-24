import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError, } from 'axios';
import {StatusCodes} from 'http-status-codes';
import {getToken} from './token';
import {toast} from 'react-toastify';
import { APIRoute } from '../const';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers = config.headers || {};
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        // ИГНОРИРУЕМ ошибку 401 при автоматической проверке токена (/login по методу GET)
        const isCheckAuthRequest =
          error.response.status === StatusCodes.UNAUTHORIZED &&
          error.config?.url === APIRoute.Login &&
          error.config?.method === 'get';

        if (!isCheckAuthRequest) {
          const detailMessage = error.response.data;
          toast.error(detailMessage.message || 'Произошла ошибка выполнения запроса');
        }
      }

      // Ловим ошибки, если сервер полностью «лежит» (нет error.response)
      if (!error.response) {
        toast.error('Проблемы с интернет-соединением или сервер недоступен');
      }

      throw error;
    }
  );

  return api;
};

