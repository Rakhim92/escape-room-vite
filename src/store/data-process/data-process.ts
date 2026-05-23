import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMyBooking, TQuest } from '../../types';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../user-process/user-process';

// Создаем чистый мутабельный тип специально для Redux State
type TMutableBooking = Omit<TMyBooking, 'location'> & {
  location: {
    address: string;
    coords: number[]; // убираем жесткий кортеж [number, number], который ломает Immer
  };
}

type TDataProcess = {
  quests: TQuest[];
  isDataLoading: boolean;
  myQuests: TMutableBooking[];
};

const initialState: TDataProcess = {
  quests: [],
  isDataLoading: false,
  myQuests: [],
};

export const dataProcess = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    loadQuests: (state, action: PayloadAction<TQuest[]>) => {
      state.quests = action.payload;
    },
    changeQuests: (state, action: PayloadAction<TQuest[]>) => {
      state.quests = action.payload;
    },
    // changeCurrentOffer: (state, action: PayloadAction<TOffer | TOfferExtended | null>) => {
    //   state.currentOffer = action.payload;
    // },
    loadMyQuests: (state, action: PayloadAction<TMyBooking[]>) => {
      state.myQuests = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    // Очищаем избранное, если пользователь разлогинился
      // Реагируем на экшен авторизации из другого слайса, чтобы очистить избранное
      .addCase(requireAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
        if (action.payload === AuthorizationStatus.NoAuth) {
          state.myQuests = [];
        }
      });
  }
});

// Автоматически сгенерированные экшены
export const {
  changeQuests,
  loadQuests,
  setLoadingStatus,
  // changeCurrentOffer,
  loadMyQuests,
} = dataProcess.actions;
