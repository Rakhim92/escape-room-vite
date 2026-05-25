import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getBookingLocations, getIsDataLoading, getQuests } from '../../store/data-process/data-process.selectors';
import { fetchBookingLocationsAction, postBookingAction } from '../../store/api-actions';
import { clearBookingLocations } from '../../store/data-process/data-process';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';
import Map from '../../components/map/map';
import NotFoundPage from '../not-found-page/not-found-page';
import LoadingScreen from '../../components/loading-screen/loading-screen';

const BookingPage = (): ReactElement => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Получаем данные из глобального хранилища
  const quests = useAppSelector(getQuests);
  const bookingLocations = useAppSelector(getBookingLocations);
  const isDataLoading = useAppSelector(getIsDataLoading);

  // Локальное состояние для отслеживания отправки формы на сервер
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedQuest = quests.find((item) => item.id === id);

  // Стейт для активного филиала квеста
  const [activeLocationId, setActiveLocationId] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const peopleCountRef = useRef<HTMLInputElement>(null);
  const childrenRef = useRef<HTMLInputElement>(null);

  // Загружаем локации при открытии страницы и очищаем при закрытии
  useEffect(() => {
    if (id) {
      dispatch(fetchBookingLocationsAction(id));
    }
    return () => {
      dispatch(clearBookingLocations());
    };
  }, [id, dispatch]);

  // Как только локации загрузились, устанавливаем первую активной по умолчанию
  useEffect(() => {
    if (bookingLocations.length > 0 && !activeLocationId) {
      setActiveLocationId(bookingLocations[0].id);
    }
  }, [bookingLocations, activeLocationId]);

  // Сбрасываем выбранное время при переключении адреса
  const handleLocationChange = (locationId: string) => {
    // Запрещаем менять локацию во время отправки формы
    if (isSubmitting) {
      return;
    }
    setActiveLocationId(locationId);
    setSelectedSlot('');
  };

  if (isDataLoading || (bookingLocations.length > 0 && !activeLocationId)) {
    return <LoadingScreen />;
  }

  const activeLocation = bookingLocations.find((loc) => loc.id === activeLocationId);

  if (!selectedQuest || !activeLocation) {
    return <NotFoundPage />;
  }

  const { title, previewImg: coverImg, previewImgWebp: coverImgWebp, peopleMinMax } = selectedQuest;
  const [minPeople, maxPeople] = peopleMinMax;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!selectedSlot) {
      toast.error('Пожалуйста, выберите дату и время квеста');
      return;
    }

    const [bookingDate, bookingTime] = selectedSlot.split('-');

    if (nameRef.current && phoneRef.current && peopleCountRef.current) {
      const peopleCount = Number(peopleCountRef.current.value);

      if (peopleCount < minPeople || peopleCount > maxPeople) {
        toast.error(`Количество участников должно быть от ${minPeople} до ${maxPeople} чел.`);
        return;
      }

      setIsSubmitting(true);

      dispatch(postBookingAction({
        questId: selectedQuest.id,
        bookingData: {
          date: bookingDate as 'today' | 'tomorrow',
          time: bookingTime,
          contactPerson: nameRef.current.value.trim(),
          phone: phoneRef.current.value.trim(),
          withChildren: childrenRef.current?.checked || false,
          peopleCount: peopleCount,
          placeId: activeLocationId,
        }
      }))
        .unwrap() // Позволяет поймать ошибку Thunk, если запрос упадет
        .then(() => {
          // Срабатывает ТОЛЬКО при успешном ответе сервера (status 201/200)
          toast.success('Квест успешно забронирован!');
          navigate(AppRoute.MyQuests); // Гарантированный редирект силами React Router
        })
        .catch(() => {
          // Если сервер вернул ошибку, разблокируем форму для исправления данных
          setIsSubmitting(false);
        });
    }
  };

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
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
          <p className="title title--size-m title--uppercase page-content__title">{title}</p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <Map
                bookingLocations={bookingLocations}
                activeLocation={activeLocation}
                onLocationChange={handleLocationChange}
              />
            </div>
            <p className="booking-map__address">Вы&nbsp;выбрали: {activeLocation.location.address}</p>
          </div>
        </div>
        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            {/* Рендеринг слотов НА СЕГОДНЯ */}
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>
              <div className="booking-form__date-inner-wrapper">
                {activeLocation.slots.today.map((slot) => {
                  const slotValue = `today-${slot.time}`;
                  return (
                    <label className="custom-radio booking-form__date" key={`today-${slot.time}`}>
                      <input
                        type="radio"
                        name="date"
                        value={slotValue}
                        checked={selectedSlot === slotValue}
                        disabled={!slot.isAvailable}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            {/* Рендеринг слотов НА ЗАВТРА */}
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>
              <div className="booking-form__date-inner-wrapper">
                {activeLocation.slots.tomorrow.map((slot) => {
                  const slotValue = `tomorrow-${slot.time}`;
                  return (
                    <label className="custom-radio booking-form__date" key={slotValue}>
                      <input
                        type="radio"
                        name="date"
                        value={slotValue}
                        checked={selectedSlot === slotValue}
                        disabled={!slot.isAvailable}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </fieldset>

          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Имя"
                pattern="[А-Яа-яЁёA-Za-z'-\- ]{1,}"
                ref={nameRef}
                required
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
                pattern="[0-9]{10,}"
                ref={phoneRef}
                required
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input
                type="number"
                id="person"
                name="person"
                placeholder="Количество участников"
                ref={peopleCountRef}
                required
              />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                name="children"
                ref={childrenRef}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use href="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
            </label>
          </fieldset>
          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input
              type="checkbox"
              id="id-order-agreement"
              name="user-agreement"
              required
            />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use href="#icon-tick" />
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
