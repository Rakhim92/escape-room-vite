import { RootState } from '../index';
import { TMyBooking, TQuest } from '../../types';

export const getQuests = (state: RootState): TQuest[] =>
  state.DATA.quests;

export const getIsDataLoading = (state: RootState): boolean =>
  state.DATA.isDataLoading;

export const getMyQuests = (state: RootState): TMyBooking[] =>
  state.DATA.myQuests as TMyBooking[];

