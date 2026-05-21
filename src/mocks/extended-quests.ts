import { TExtendedQuest } from '../types';

const extendedQuests: TExtendedQuest[] = [
  {
    id: '1',
    title: 'Склеп',
    previewImg: '/img/content/crypt/crypt-size-s.jpg',
    previewImgWebp: '/img/content/crypt/crypt-size-s.webp',
    level: 'hard',
    type: 'adventures',
    peopleMinMax: [2, 5],
    description: 'Средневековое кладбище таит в себе много страшных тайн. Местные жители говорят, что в склепе похоронен граф вампир, который по ночам выходит на охоту, чтобы испить человеческой крови. Через час солнце опустится за горизонт, успеете ли вы убить вампира и выбраться из склепа?',
    coverImg: '/img/content/crypt/crypt-size-m@2x.jpg',
    coverImgWebp: '/img/content/crypt/crypt-size-m@2x.jpg'
  },
  {
    id: '2',
    title: 'Маньяк',
    previewImg: '/img/content/maniac/maniac-size-s.jpg',
    previewImgWebp: '/img/content/maniac/maniac-size-s.webp',
    level: 'medium',
    type: 'horror',
    peopleMinMax: [3, 6],
    description: 'Средневековое кладбище таит в себе много страшных тайн. Местные жители говорят, что в склепе похоронен граф вампир, который по ночам выходит на охоту, чтобы испить человеческой крови. Через час солнце опустится за горизонт, успеете ли вы убить вампира и выбраться из склепа?',
    coverImg: '/img/content/maniac/maniac-size-m.jpg',
    coverImgWebp: '/img/content/maniac/maniac-size-m.webp'
  },
  {
    id: '3',
    title: 'Ритуал',
    previewImg: '/img/content/ritual/ritual-size-s.jpg',
    previewImgWebp: '/img/content/ritual/ritual-size-s.webp',
    level: 'easy',
    type: 'mystic',
    peopleMinMax: [3, 5],
    description: 'Средневековое кладбище таит в себе много страшных тайн. Местные жители говорят, что в склепе похоронен граф вампир, который по ночам выходит на охоту, чтобы испить человеческой крови. Через час солнце опустится за горизонт, успеете ли вы убить вампира и выбраться из склепа?',
    coverImg: '/img/content/ritual/ritual-size-m@2x.jpg',
    coverImgWebp: '/img/content/ritual/ritual-size-m@2x.jpg'
  },
] as const;

export {extendedQuests};
