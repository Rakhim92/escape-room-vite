import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { TMyBooking } from '../../types';
import QuestsCardList from '../../components/quest-card/quest-card-list';

type TMyQuests = {
  myBookingsData: TMyBooking[];
}

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
      ) :
        <QuestsCardList
          quests={myBookingsData}
        />}
    </div>
  </main>
);

export default MyQuests;
