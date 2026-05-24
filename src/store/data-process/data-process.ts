import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBookingLocation, TExtendedQuest, TMyBooking, TQuest } from '../../types';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization } from '../user-process/user-process';
import { fetchBookingLocationsAction, fetchExtendedQuestAction } from '../api-actions';

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
  bookingLocations: TBookingLocation[];
  currentQuest: TExtendedQuest | null;
  currentType: string; // по умолчанию 'all'
  currentLevel: string; // по умолчанию 'any'
};

const initialState: TDataProcess = {
  quests: [],
  isDataLoading: false,
  myQuests: [],
  bookingLocations: [],
  currentQuest: null,
  currentType: 'all', // 'all' означает, что фильтр не выбран
  currentLevel: 'any',
};

export const dataProcess = createSlice({
  name: 'DATA',
  initialState,
  reducers: {
    // Редюсер для очистки локаций при уходе со страницы
    clearBookingLocations: (state) => {
      state.bookingLocations = [];
    },
    clearCurrentQuest: (state) => {
      state.currentQuest = null;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    loadQuests: (state, action: PayloadAction<TQuest[]>) => {
      state.quests = action.payload;
    },
    changeQuests: (state, action: PayloadAction<TQuest[]>) => {
      state.quests = action.payload;
    },
    loadMyQuests: (state, action: PayloadAction<TMyBooking[]>) => {
      state.myQuests = action.payload;
    },
    // Экшены для изменения фильтров
    changeType: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },
    changeLevel: (state, action: PayloadAction<string>) => {
      state.currentLevel = action.payload;
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
      })
      .addCase(fetchBookingLocationsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchBookingLocationsAction.fulfilled, (state, action) => {
        state.bookingLocations = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchBookingLocationsAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchExtendedQuestAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchExtendedQuestAction.fulfilled, (state, action) => {
        state.currentQuest = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchExtendedQuestAction.rejected, (state) => {
        state.isDataLoading = false;
      });
  }
});

// Автоматически сгенерированные экшены
export const {
  changeQuests,
  loadQuests,
  setLoadingStatus,
  clearBookingLocations,
  // changeCurrentOffer,
  loadMyQuests,
  clearCurrentQuest,
  changeType,
  changeLevel
} = dataProcess.actions;
