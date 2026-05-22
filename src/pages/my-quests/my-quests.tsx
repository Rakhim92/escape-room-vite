import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TMyBooking } from '../../types';

type TMyQuests = {
  myBookingsData: TMyBooking[];
}

const LevelLabel = {
  easy: 'Простой',
  medium: 'Средний',
  hard: 'Сложный',
} as const;

const MyQuests = ({myBookingsData}: TMyQuests):JSX.Element => (
  <main className="page-content decorated-page">
    <div className="decorated-page__decor" aria-hidden="true">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/maniac/maniac-bg-size-m.webp,
          img/content/maniac/maniac-bg-size-m@2x.webp 2x"
        />
        <img
          src="img/content/maniac/maniac-bg-size-m.jpg"
          srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
          width="1366"
          height="1959"
          alt=""
        />
      </picture>
    </div>
    <div className="container">
      <div className="page-content__title-wrapper">
        <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
      </div>
      {myBookingsData.length === 0 ? (
        <p className="subtitle">У вас пока нет забронированных квестов. <Link to={AppRoute.Root} className="link">Выбрать квест</Link></p>
      ) : (
        <div className="cards-grid">
          {myBookingsData.map((item) => {
            const { quest, date, time, peopleCount, location, id } = item;
            return (
              <div className="quest-card" key={id}>
                <div className="quest-card__img">
                  <picture>
                    <source type="image/webp" srcSet={quest.previewImgWebp} />
                    <img src={quest.previewImg} width="344" height="232" alt={quest.title} />
                  </picture>
                </div>
                <div className="quest-card__content">
                  <div className="quest-card__info-wrapper">
                    <Link className="quest-card__link" to={`${AppRoute.Quest}/${quest.id}`}>
                      {quest.title}
                    </Link>
                    <span className="quest-card__info">
                      {date === 'today' ? 'Сегодня' : 'Завтра'}, {time} {location.address}
                    </span>
                  </div>
                  <ul className="tags quest-card__tags">
                    <li className="tags__item">
                      <svg width="11" height="14" aria-hidden="true"><use href="#icon-person" /></svg>
                      {peopleCount} чел
                    </li>
                    <li className="tags__item">
                      <svg width="14" height="14" aria-hidden="true"><use href="#icon-level" /></svg>
                      {LevelLabel[quest.level]}
                    </li>
                  </ul>
                  <button
                    className="btn btn--accent btn--secondary quest-card__btn"
                    type="button"
                  >
                    Отменить бронь
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </main>
);

export default MyQuests;
