import { ReactElement, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TBookingLocation, TExtendedQuest } from '../../types';
import NotFoundPage from '../not-found-page/not-found-page';

type TBookingPageProps = {
  extendedQuests: TExtendedQuest[];
  bookingLocations: TBookingLocation[];
};

// Координаты для карты (центральный офис/филиал)
const MAP_CENTER = {
  latitude: 59.968322,
  longitude: 30.317559,
  zoom: 16,
};

const BookingPage = ({ extendedQuests, bookingLocations }: TBookingPageProps): ReactElement => {
  const params = useParams<{ id: string }>(); // Вытаскиваем id из родительского роута квеста
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Ищем выбранный квест в расширенном массиве данных
  const selectedQuest = extendedQuests.find((item) => item.id === params.id);

  useEffect(() => {
    let map: leaflet.Map | null = null;

    // Инициализация карты только если квест найден и DOM-контейнер готов
    if (selectedQuest && mapRef.current && !mapRef.current.classList.contains('leaflet-container')) {
      map = leaflet.map(mapRef.current, {
        center: [MAP_CENTER.latitude, MAP_CENTER.longitude],
        zoom: MAP_CENTER.zoom,
      });

      leaflet
        .tileLayer('https://{s}://{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>',
        })
        .addTo(map);

      const customIcon = leaflet.icon({
        iconUrl: '/img/svg/pin-default.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      leaflet
        .marker([MAP_CENTER.latitude, MAP_CENTER.longitude], { icon: customIcon })
        .addTo(map);
    }

    // Сброс и уничтожение инстанса карты при размонтировании вложенного роута
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [selectedQuest]);

  // Защита: если перешли на несуществующий /quest/невалидный-id/booking
  if (!selectedQuest) {
    return <NotFoundPage />;
  }

  const { title, coverImg, coverImgWebp } = selectedQuest;

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          {/* ИСПРАВЛЕНО: Динамический фон вложенного квеста со слэшем / от корня сайта */}
          <source type="image/webp" srcSet={`${coverImgWebp} 2x`} />
          <img
            src={coverImg}
            srcSet={`${coverImg} 2x`}
            width="1366"
            height="1959"
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста</h1>
          {/* ИСПРАВЛЕНО: Динамический вывод названия выбранного квеста */}
          <p className="title title--size-m title--uppercase page-content__title">{title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              {/* ИСПРАВЛЕНО: Привязали ref для инициализации Leaflet */}
              <div className="map__container" ref={mapRef} style={{ height: '100%' }}></div>
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская</p>
          </div>
        </div>
        <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>
              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="today9h45m" name="date" value="today9h45m" />
                  <span className="custom-radio__label">9:45</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="today15h00m" name="date" defaultChecked value="today15h00m" />
                  <span className="custom-radio__label">15:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="today17h30m" name="date" value="today17h30m" />
                  <span className="custom-radio__label">17:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="today19h30m" name="date" value="today19h30m" disabled />
                  <span className="custom-radio__label">19:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="today21h30m" name="date" value="today21h30m" />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>
              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="tomorrow11h00m" name="date" value="tomorrow11h00m" />
                  <span className="custom-radio__label">11:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="tomorrow15h00m" name="date" value="tomorrow15h00m" disabled />
                  <span className="custom-radio__label">15:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="tomorrow17h30m" name="date" value="tomorrow17h30m" disabled />
                  <span className="custom-radio__label">17:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="tomorrow19h45m" name="date" value="tomorrow19h45m" />
                  <span className="custom-radio__label">19:45</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input type="radio" id="tomorrow21h30m" name="date" value="tomorrow21h30m" />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input type="text" id="name" name="name" placeholder="Имя" pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input type="tel" id="tel" name="tel" placeholder="Телефон" pattern="[0-9]{10,}" />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input type="number" id="person" name="person" placeholder="Количество участников" />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input type="checkbox" id="children" name="children" defaultChecked />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use href="#icon-tick" /> {/* Исправлено: href вместо xlinkHref */}
                </svg>
              </span>
              <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>
          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use href="#icon-tick" /> {/* Исправлено: href вместо xlinkHref */}
              </svg>
            </span>
            <span className="custom-checkbox__label">Я&nbsp;согласен с{' '}
              <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
};

export default BookingPage;
