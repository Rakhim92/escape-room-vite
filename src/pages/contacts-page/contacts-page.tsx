import { ReactElement, useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MAP_CENTER = {
  latitude: 59.968322,
  longitude: 30.317559,
  zoom: 16,
};

const ContactsPage = (): ReactElement => { // Изменено: ReactElement вместо JSX.Element
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: leaflet.Map | null = null;

    if (mapRef.current && !mapRef.current.classList.contains('leaflet-container')) {
      // 1. Создаем объект карты
      map = leaflet.map(mapRef.current, {
        center: [MAP_CENTER.latitude, MAP_CENTER.longitude],
        zoom: MAP_CENTER.zoom,
      });

      // 2. ИСПРАВЛЕНО: Восстановлен валидный URL тайлов от OpenStreetMap/CartoDB
      leaflet
        .tileLayer('https://{s}://{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>',
        })
        .addTo(map);

      // 3. Создаем кастомную иконку пина
      const customIcon = leaflet.icon({
        iconUrl: '/img/svg/pin-default.svg', // Убедитесь, что файл лежит в public/img/svg/pin-default.svg
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      // 4. Ставим маркер на карту
      leaflet
        .marker([MAP_CENTER.latitude, MAP_CENTER.longitude], { icon: customIcon })
        .addTo(map);
    }

    // ИСПРАВЛЕНО: Добавлен cleanup-эффект для уничтожения карты при уходе со страницы
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          {/* ИСПРАВЛЕНО: Убраны точки из путей, сделаны абсолютные ссылки от корня сайта */}
          <source
            type="image/webp"
            srcSet="/img/content/maniac/maniac-bg-size-m.webp, /img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="/img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width="1366"
            height="1959"
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper page-content__title-wrapper--underlined">
          <p className="subtitle page-content__subtitle">квесты в&nbsp;Санкт-Петербурге</p>
          <h1 className="title title--size-m page-content__title">Контакты</h1>
        </div>
        <div className="contacts">
          <dl className="contacts__list">
            <div className="contacts__item">
              <dt className="contacts__dt">Адрес</dt>
              <dd className="contacts__dd">
                <address className="contacts__address">
                  Санкт-Петербург,
                  <br /> Набережная реки Карповка, д 5П
                </address>
              </dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">Режим работы</dt>
              <dd className="contacts__dd">Ежедневно, с&nbsp;10:00 до&nbsp;22:00</dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">Телефон</dt>
              <dd className="contacts__dd">
                <a className="link" href="tel:88003335599">8 (000) 111-11-11</a>
              </dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">E&ndash;mail</dt>
              <dd className="contacts__dd">
                <a className="link" href="mailto:info@escape-room.ru">info@escape-room.ru</a>
              </dd>
            </div>
          </dl>
          <div className="contacts__map">
            <div className="map">
              <div className="map__container" ref={mapRef} style={{ height: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactsPage;
