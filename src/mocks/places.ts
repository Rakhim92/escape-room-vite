import { TBookingLocation } from '../types';

const bookingLocations: TBookingLocation[] = [
  {
    id: '8d202e9a-13f5-4a01-a7df-f468ee5bccb3',
    location: {
      address: 'Аллея 100 летия Комсомола, м. Политехническая',
      coords: [60.022639880785924, 30.365151487500537]
    },
    slots: {
      today: [
        { time: '14:00', isAvailable: false },
        { time: '15:00', isAvailable: true },
        { time: '16:00', isAvailable: true },
        { time: '17:00', isAvailable: true },
        { time: '18:00', isAvailable: true },
        { time: '19:00', isAvailable: true },
        { time: '20:00', isAvailable: false }
      ],
      tomorrow: [
        { time: '14:00', isAvailable: true },
        { time: '15:00', isAvailable: false },
        { time: '16:00', isAvailable: true },
        { time: '17:00', isAvailable: true },
        { time: '18:00', isAvailable: true },
        { time: '19:00', isAvailable: true },
        { time: '20:00', isAvailable: true }
      ]
    }
  },
  {
    id: '97cc6a1c-c7ab-4377-9397-68db5a93a3b0',
    location: {
      address: 'Автозаводский пр-д, 1, м. Шушары',
      coords: [59.82179701478202, 30.42098372734333]
    },
    slots: {
      today: [
        { time: '14:00', isAvailable: true },
        { time: '15:00', isAvailable: false },
        { time: '16:00', isAvailable: false },
        { time: '17:00', isAvailable: false },
        { time: '18:00', isAvailable: false },
        { time: '19:00', isAvailable: false },
        { time: '20:00', isAvailable: false }
      ],
      tomorrow: [
        { time: '14:00', isAvailable: true },
        { time: '15:00', isAvailable: true },
        { time: '16:00', isAvailable: false },
        { time: '17:00', isAvailable: false },
        { time: '18:00', isAvailable: false },
        { time: '19:00', isAvailable: true },
        { time: '20:00', isAvailable: true }
      ]
    }
  },
  {
    id: 'e77afa3b-94d8-42cb-9154-b932e51dc8e0',
    location: {
      address: 'пр. Большевиков, 18 лит. А, м. Дыбенко',
      coords: [59.90840521851865, 30.48297378898692]
    },
    slots: {
      today: [
        { time: '14:00', isAvailable: true },
        { time: '15:00', isAvailable: false },
        { time: '16:00', isAvailable: true },
        { time: '17:00', isAvailable: true },
        { time: '18:00', isAvailable: false },
        { time: '19:00', isAvailable: false },
        { time: '20:00', isAvailable: false }
      ],
      tomorrow: [
        { time: '14:00', isAvailable: false },
        { time: '15:00', isAvailable: false },
        { time: '16:00', isAvailable: false },
        { time: '17:00', isAvailable: true },
        { time: '18:00', isAvailable: true },
        { time: '19:00', isAvailable: true },
        { time: '20:00', isAvailable: false }
      ]
    }
  }
];

// Экспортируем типизированный массив для использования в App.tsx
export {bookingLocations};
