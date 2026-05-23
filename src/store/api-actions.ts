import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TQuest, UserData, AuthData, AppDispatch, State, TMyBooking} from '../types.ts';
import { redirectToRoute} from './action';
import {requireAuthorization, saveAuthInfo} from './user-process/user-process.ts';
import {loadMyQuests, loadQuests, setLoadingStatus } from './data-process/data-process.ts';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute, USER_AUTH_DATA} from '../const';

export const fetchQuestsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    const {data} = await api.get<TQuest[]>(APIRoute.Quests);
    dispatch(setLoadingStatus(false));
    dispatch(loadQuests(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    localStorage.setItem(USER_AUTH_DATA, JSON.stringify(email));
    dispatch(saveAuthInfo(email));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    localStorage.removeItem(USER_AUTH_DATA);
    dispatch(saveAuthInfo(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    // Добавляем автоматический переход на главную после выхода
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

// Получение списка забронированных квестов (Мои бронирования)
export const fetchMyQuestsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchMyQuests',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingStatus(true));
    // Делаем запрос к эндпоинту бронирований (убедитесь, что APIRoute.Reservation правильный)
    const {data} = await api.get<TMyBooking[]>(APIRoute.Reservation);
    dispatch(setLoadingStatus(false));
    dispatch(loadMyQuests(data));
  },
);

// Удаление (отмена) бронирования
export const deleteBookingAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteBooking',
  async (bookingId, {extra: api}) => {
    // Отправляем DELETE запрос на сервер с id бронирования
    await api.delete(`${APIRoute.Reservation}/${bookingId}`);
    // Возвращаем id удаленной брони, чтобы редьюсер отфильтровал её в стейте
    return bookingId;
  },
);

