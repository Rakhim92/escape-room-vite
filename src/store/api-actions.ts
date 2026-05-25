import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TQuest, UserData, AuthData, AppDispatch, State, TMyBooking, TBookingLocation, TExtendedQuest, TBookingPostData } from '../types.ts';
import { redirectToRoute } from './action';
import { requireAuthorization, saveAuthInfo } from './user-process/user-process.ts';
import { loadMyQuests, loadQuests, setLoadingStatus } from './data-process/data-process.ts';
import { saveToken, dropToken, getToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute, USER_AUTH_DATA } from '../const';

export const fetchExtendedQuestAction = createAsyncThunk<TExtendedQuest, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchExtendedQuest',
  async (questId, { extra: api }) => {
    const { data } = await api.get<TExtendedQuest>(`${APIRoute.Quests}/${questId}`);
    return data;
  },
);

export const postBookingAction = createAsyncThunk<
  void, // Экшен ничего не возвращает в редьюсер, так как мы сразу уходим на другую страницу
  { questId: string; bookingData: TBookingPostData },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postBooking',
  async ({ questId, bookingData }, { extra: api }) => {
    // Отправляем POST-запрос на эндпоинт вида: /quests/:id/booking
    await api.post(`${APIRoute.Quests}/${questId}/booking`, bookingData);
  },
);

export const fetchBookingLocationsAction = createAsyncThunk<TBookingLocation[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchBookingLocations',
  async (questId, { extra: api }) => {
    // Пример эндпоинта: /quests/:id/booking
    const { data } = await api.get<TBookingLocation[]>(`${APIRoute.Quests}/${questId}/booking`);
    return data;
  },
);

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
    const token = getToken();
    if (!token || token.trim() === '') {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return;
    }
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

