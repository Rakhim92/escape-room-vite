import { TCity, TCompanyLocation } from './types';

enum APIRoute {
  Quests = 'quest',
  Booking = '/booking',
  Reservation = 'reservation',
  Login = '/login',
  Logout = '/logout'
}

const USER_AUTH_DATA = 'user-auth-data';

enum AppRoute {
  Root = '/',
  Quest = '/quest',
  Contacts = '/contacts',
  Login = '/login',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const LEVEL = [
  {
    title: 'any',
    description: 'Любой'
  },
  {
    title: 'easy',
    description: 'Легкий'
  },
  {
    title: 'medium',
    description: 'Средний'
  },
  {
    title: 'hard',
    description: 'Сложный'
  },
];

const GENRE = [
  {
    title: 'all',
    description: 'Все квесты',
    icon: '#icon-all-quests'
  },
  {
    title: 'adventures',
    description: 'Приключения',
    icon: '#icon-adventure'
  },
  {
    title: 'horror',
    description: 'Ужасы',
    icon: '#icon-horror'
  },
  {
    title: 'mystic',
    description: 'Мистика',
    icon: '#icon-mystic'
  },
  {
    title: 'detective',
    description: 'Детектив',
    icon: '#icon-detective'
  },
  {
    title: 'sci-fi',
    description: 'Sci-fi',
    icon: '#icon-sci-fi'
  }
];

const SPETERBURG: TCity = {
  name: 'Санкт-Петербург',
  location: {
    latitude: 59.9386,
    longitude: 30.3141,
    zoom: 10
  }
};

const COMPANY_LOCATION: TCompanyLocation[] = [
  {
    id: 'Escape room',
    name: 'Escape room',
    location: {
      address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
      coords: [59.968322, 30.317359]
    }
  }
];

export {AppRoute, GENRE, LEVEL, AuthorizationStatus, SPETERBURG, COMPANY_LOCATION, USER_AUTH_DATA, APIRoute};

