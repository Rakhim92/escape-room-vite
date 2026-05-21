import { Link, useParams } from 'react-router-dom';
import { TExtendedQuest } from '../../types';
import NotFoundPage from '../not-found-page/not-found-page';
import { AppRoute } from '../../const';

type TQuestsPage = {
  extendedQuests: readonly TExtendedQuest[];
}

const LevelLabel = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

const GenreLabel: Record<string, string> = {
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  sciFi: 'Sci-fi',
};

const QuestPage = ({extendedQuests}: TQuestsPage):JSX.Element => {
  const params = useParams<{ id: string }>();
  const selectedQuest = extendedQuests.find((item) => item.id === params.id) as TExtendedQuest;
  if (!selectedQuest) {
    return <NotFoundPage />;
  }
  const {title, coverImg, coverImgWebp, level, type, peopleMinMax, description} = selectedQuest;
  const [minPeople, maxPeople] = peopleMinMax;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${coverImgWebp} 2x`}
          />
          <img
            src={coverImg}
            srcSet={`${coverImg} 2x`}
            width="1366"
            height="768"
            alt={`Квест ${title}`}
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
          <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{GenreLabel[type]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use href="#icon-person"/>
              </svg>{minPeople}&ndash;{maxPeople}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use href="#icon-level"/>
              </svg>{LevelLabel[level]}
            </li>
          </ul>
          <p className="quest-page__description">{description}</p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={`${AppRoute.Booking}/${selectedQuest.id}`} // Динамический переход на бронирование этого квеста
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
};

export default QuestPage;
