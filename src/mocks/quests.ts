import { TQuest } from '../types';

const quests: TQuest[] = [
  {
    id: '1',
    title: 'Склеп',
    previewImg: '/img/content/crypt/crypt-size-s.jpg',
    previewImgWebp: '/img/content/crypt/crypt-size-s.webp',
    level: 'hard',
    type: 'adventures',
    peopleMinMax: [2, 5]
  },
  {
    id: '2',
    title: 'Маньяк',
    previewImg: '/img/content/maniac/maniac-size-s.jpg',
    previewImgWebp: '/img/content/maniac/maniac-size-s.webp',
    level: 'medium',
    type: 'horror',
    peopleMinMax: [3, 6]
  },
  {
    id: '3',
    title: 'Ритуал',
    previewImg: '/img/content/ritual/ritual-size-s.jpg',
    previewImgWebp: '/img/content/ritual/ritual-size-s.webp',
    level: 'easy',
    type: 'mystic',
    peopleMinMax: [3, 5]
  },
  {
    id: '4',
    title: 'История призраков',
    previewImg: '/img/content/ghosts/ghosts-size-s.jpg',
    previewImgWebp: '/img/content/ghosts/ghosts-size-s.webp',
    level: 'easy',
    type: 'mystic',
    peopleMinMax: [5, 6]
  },
  {
    id: '5',
    title: 'Тайны старого особняка',
    previewImg: '/img/content/palace/palace-size-s.jpg',
    previewImgWebp: '/img/content/palace/palace-size-s.webp',
    level: 'easy',
    type: 'detective',
    peopleMinMax: [3, 5]
  },
  {
    id: '6',
    title: 'Хижина в лесу',
    previewImg: '/img/content/hut/hut-size-s.jpg',
    previewImgWebp: '/img/content/hut/hut-size-s.webp',
    level: 'medium',
    type: 'detective',
    peopleMinMax: [4, 7]
  },
  {
    id: '7',
    title: 'Фатальный эксперимент',
    previewImg: '/img/content/experiment/experiment-size-s.jpg',
    previewImgWebp: '/img/content/experiment/experiment-size-s.webp',
    level: 'hard',
    type: 'detective',
    peopleMinMax: [4, 7]
  },
  {
    id: '8',
    title: 'Метро 2033',
    previewImg: '/img/content/metro/metro-size-s.jpg',
    previewImgWebp: '/img/content/metro/metro-size-s.webp',
    level: 'medium',
    type: 'adventures',
    peopleMinMax: [6, 8]
  },
  {
    id: '9',
    title: 'Старый чердак',
    previewImg: '/img/content/loft/loft-size-s.jpg',
    previewImgWebp: '/img/content/loft/loft-size-s.webp',
    level: 'easy',
    type: 'detective',
    peopleMinMax: [2, 3]
  },
  {
    id: '10',
    title: 'Последний рубеж',
    previewImg: '/img/content/frontier/frontier-size-s.jpg',
    previewImgWebp: '/img/content/frontier/frontier-size-s.webp',
    level: 'medium',
    type: 'adventures',
    peopleMinMax: [4, 7]
  },
  {
    id: '11',
    title: 'Марс-2056',
    previewImg: '/img/content/mars/mars-size-s.jpg',
    previewImgWebp: '/img/content/mars/mars-size-s.webp',
    level: 'easy',
    type: 'horror',
    peopleMinMax: [2, 4]
  }
];

export {quests};
