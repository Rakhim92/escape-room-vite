export type TQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: string;
  readonly peopleMinMax: [number, number]; // Кортеж из двух чисел [min, max]
};

