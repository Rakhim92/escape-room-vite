import { RootState } from '../index';
import { State, TBookingLocation, TExtendedQuest, TMyBooking, TQuest } from '../../types';

export const getQuests = (state: RootState): TQuest[] =>
  state.DATA.quests;

export const getIsDataLoading = (state: RootState): boolean =>
  state.DATA.isDataLoading;

export const getMyQuests = (state: RootState): TMyBooking[] =>
  state.DATA.myQuests as TMyBooking[];

export const getBookingLocations = (state: State): TBookingLocation[] => state.DATA.bookingLocations;

export const getCurrentQuest = (state: State): TExtendedQuest | null => state.DATA.currentQuest;


