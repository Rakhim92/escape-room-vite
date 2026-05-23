import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError, } from 'axios';
import {StatusCodes} from 'http-status-codes';
import {getToken} from './token';
import {toast} from 'react-toastify';

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
  // Конфигурация пакета Axios для отправки сетевых запросов
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
        const detailMessage = (error.response.data);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};

