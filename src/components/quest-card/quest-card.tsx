import { Link } from 'react-router-dom';
import { TMyBooking, TQuest } from '../../types';
import { AppRoute } from '../../const';
import { isMyBooking } from '../../utils';

type TQuestCard = {
  quest: TQuest | TMyBooking;
};

const LevelLabel = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

const TodayTomorrowTranslate = {
  today: 'сегодня',
  tomorrow: 'завтра'
};

const QuestCard = ({quest}: TQuestCard):JSX.Element => {
  // Проверяем, вложенный ли это квест (из TMyBooking) или прямой (из TQuest)
  const questData = isMyBooking(quest) ? quest.quest : quest;
  const { title, previewImg, previewImgWebp, level, peopleMinMax, id } = questData;
  const [minPeople, maxPeople] = peopleMinMax;
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <Link
          to={`${AppRoute.Quest}/${id}`}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp},
              ${previewImgWebp}@2x.webp 2x`}
            />
            <img
              src={previewImg}
              srcSet={`${previewImg}@2x.jpg 2x`}
              width="344"
              height="232"
              alt={`Превью квеста ${title}`}
            />
          </picture>
        </Link>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={`${AppRoute.Quest}/${id}`}
          >{title}
          </Link>
          {isMyBooking(quest) && (
            <span
              className="quest-card__info"
            >
              {`${TodayTomorrowTranslate[quest.date]}, ${quest.time}, ${quest.location.address}`}
            </span>
          )}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"/>
            </svg>{minPeople}&ndash;{maxPeople}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"/>
            </svg>{LevelLabel[level]}
          </li>
        </ul>
        {isMyBooking(quest) && (
          <button
            className="btn btn--accent btn--secondary quest-card__btn"
            type="button"
          >Отменить
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;

