const QuestCard = ():JSX.Element => (
  <div className="quest-card">
    <div className="quest-card__img">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/crypt/crypt-size-s.webp,
          img/content/crypt/crypt-size-s@2x.webp 2x"
        />
        <img
          src="img/content/crypt/crypt-size-s.jpg"
          srcSet="img/content/crypt/crypt-size-s@2x.jpg 2x"
          width="344"
          height="232"
          alt="Мужчина в клетке в подземелье."
        />
      </picture>
    </div>
    <div className="quest-card__content">
      <div className="quest-card__info-wrapper">
        <a className="quest-card__link" href="quest.html">Склеп</a>
      </div>
      <ul className="tags quest-card__tags">
        <li className="tags__item">
          <svg width="11" height="14" aria-hidden="true">
            <use xlinkHref="#icon-person"></use>
          </svg>2&ndash;5&nbsp;чел
        </li>
        <li className="tags__item">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-level"></use>
          </svg>Сложный
        </li>
      </ul>
    </div>
  </div>
);

export default QuestCard;

