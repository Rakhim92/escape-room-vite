import {store} from './store/index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type TBookingPostData = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type TDataProcess = {
  quests: TQuest[];
  isDataLoading: boolean;
  myQuests: TMyBooking[];
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type TMyBooking = {
  id: string;
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  location: {
    address: string;
    coords: [number, number];
  };
  quest: TQuest;
};

export type TQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' |'mystic'|'detective'|'sci-fi';
  peopleMinMax: [number, number];
};

export type TSlot = {
  time: string;
  isAvailable: boolean;
};

export type TBookingLocation = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: TSlot[];
    tomorrow: TSlot[];
  };
};

export type TCompanyLocation = {
  id: string;
  name: string;
  location: {
    address: string;
    coords: [number, number];
  };
}

export type TCity = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type TExtendedQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' |'mystic'|'detective'|'sci-fi';
  peopleMinMax: [number, number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

