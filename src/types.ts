export type TQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' |'mystic'|'detective'|'sci-fi';
  readonly peopleMinMax: [number, number]; // Кортеж из двух чисел [min, max]
};

export type TExtendedQuest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: 'easy' | 'medium' | 'hard';
  type: 'adventures' | 'horror' |'mystic'|'detective'|'sci-fi';
  readonly peopleMinMax: [number, number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

