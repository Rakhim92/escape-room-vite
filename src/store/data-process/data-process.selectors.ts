import { RootState } from '../index';
import { State, TBookingLocation, TExtendedQuest, TMyBooking, TQuest } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const getQuests = (state: RootState): TQuest[] =>
  state.DATA.quests;

export const getIsDataLoading = (state: RootState): boolean =>
  state.DATA.isDataLoading;

export const getMyQuests = (state: RootState): TMyBooking[] =>
  state.DATA.myQuests as TMyBooking[];

export const getBookingLocations = (state: State): TBookingLocation[] =>
  state.DATA.bookingLocations;

export const getCurrentQuest = (state: State): TExtendedQuest | null =>
  state.DATA.currentQuest;

export const getCurrentType = (state: State): string =>
  state.DATA.currentType;

export const getCurrentLevel = (state: State): string =>
  state.DATA.currentLevel;

// Мемоизированный селектор отфильтрованных квестов
export const getFilteredQuests = createSelector(
  [getQuests, getCurrentType, getCurrentLevel],
  (quests, currentType, currentLevel) => quests.filter((quest) => {
    const matchType = currentType === 'all' || quest.type === currentType;
    const matchLevel = currentLevel === 'any' || quest.level === currentLevel;
    return matchType && matchLevel;
  })
);


