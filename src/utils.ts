import { TMyBooking, TQuest } from './types';

const isMyBooking = (item: TQuest | TMyBooking): item is TMyBooking => 'quest' in item;

export {isMyBooking};
