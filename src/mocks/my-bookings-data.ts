import { TMyBooking } from '../types';

const myBookingsData: TMyBooking[] = [
  {
    id: '0c5fa01d-e89c-478d-9b85-799cf4abe29f',
    date: 'today',
    time: '14:00',
    contactPerson: 'Oliver',
    phone: '899911122233',
    withChildren: true,
    peopleCount: 3,
    location: {
      address: 'Набережная реки Карповки, 5П',
      coords: [59.968322, 30.317359]
    },
    quest: {
      id: 'aba664c3-bdf3-4fb3-b8f3-42e007864bbf',
      title: 'Склеп',
      previewImg: '/img/content/crypt/crypt-size-s.jpg',
      previewImgWebp: '/img/content/crypt/crypt-size-s.webp',
      level: 'easy',
      type: 'adventures',
      peopleMinMax: [2, 5]
    }
  }
];

export {myBookingsData};
