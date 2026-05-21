enum AppRoute {
  Root = '/',
  Quest = '/quest',
  Contacts = '/contacts',
  Login = '/login',
  Booking = '/booking',
  MyQuests = '/my-quests'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const getAuthorizationStatus = AuthorizationStatus.Auth;

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
    title: 'adventure',
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

export {AppRoute, GENRE, LEVEL, AuthorizationStatus, getAuthorizationStatus};

