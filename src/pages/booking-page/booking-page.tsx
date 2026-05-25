import { ReactElement, useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { TBookingPostData } from '../../types';

type BookingFormData = {
  date: string;// Значение формата "today-14:00" или "tomorrow-17:30"
  name: string;
  tel: string;
  person: number;
  children: boolean;
  'user-agreement': boolean;
};

const BookingPage = (): ReactElement => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Получаем данные из глобального хранилища
  const quests = useAppSelector(getQuests);
  const bookingLocations = useAppSelector(getBookingLocations);
  const isDataLoading = useAppSelector(getIsDataLoading);

  // Стейт для активного филиала квеста
  const [activeLocationId, setActiveLocationId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleLocationChange = (locationId: string) => {
    // Запрещаем менять локацию во время отправки формы
    if (isSubmitting) {
      return;
    }
    setActiveLocationId(locationId);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: 'onTouched',
    defaultValues: {
      date: '',
      children: false,
    }
  });

  const selectedQuest = quests.find((item) => item.id === id);

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

  if (isDataLoading || (bookingLocations.length > 0 && !activeLocationId)) {
    return <LoadingScreen />;
  }

  const activeLocation = bookingLocations.find((loc) => loc.id === activeLocationId);

  if (!selectedQuest || !activeLocation) {
    return <NotFoundPage />;
  }

  const { title, previewImg: coverImg, previewImgWebp: coverImgWebp, peopleMinMax } = selectedQuest;
  const [minPeople, maxPeople] = peopleMinMax;

  const onSubmit = (data: BookingFormData): void => {
    const [dateType, time] = data.date.split('-') as ['today' | 'tomorrow', string];

    if (!dateType || !time) {
      toast.warn('Пожалуйста, выберите дату и время квеста');
      return;
    }

    if (!id) {
      toast.error('Ошибка: Квест не найден');
      return;
    }

    const bookingData: TBookingPostData = {
      date: dateType,
      time: time,
      contactPerson: data.name,
      phone: data.tel,
      peopleCount: Number(data.person),
      withChildren: data.children,
      placeId: activeLocationId
    };

    setIsSubmitting(true);

    dispatch(postBookingAction({ questId: id, bookingData }))
      .unwrap()
      .then(() => {
        toast.success('Квест успешно забронирован!');
        navigate(AppRoute.MyQuests);
      })
      .catch(() => {
        toast.error('Не удалось отправить бронирование. Попробуйте снова.');
        setIsSubmitting(false);
      });
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
          onSubmit={(evt) => {
            void handleSubmit(onSubmit)(evt);
          }}
          noValidate
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
                        value={slotValue}
                        disabled={!slot.isAvailable}
                        {...register('date', { required: 'Выберите время квеста' })}
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
                        value={slotValue}
                        disabled={!slot.isAvailable}
                        {...register('date', { required: 'Выберите время квеста' })}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            {errors.date && <p className="custom-input__error" style={{ color: '#e25151', marginTop: '10px' }}>{errors.date.message}</p>}
          </fieldset>

          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                placeholder="Имя"
                {...register('name', {
                  required: 'Поле обязательно для заполнения',
                  minLength: { value: 1, message: 'Имя должно содержать минимум 1 символ' },
                  maxLength: { value: 15, message: 'Максимум 15 символов' },
                })}
              />
              {errors.name && <p className="custom-input__error" style={{ color: '#e25151' }}>{errors.name.message}</p>}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input
                type="tel"
                id="tel"
                placeholder="Телефон"
                {...register('tel', {
                  required: 'Поле обязательно для заполнения',
                  pattern: {
                    value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                    message: 'Формат телефона должен быть +7 (000) 000-00-00',
                  },
                })}
              />
              {errors.tel && <p className="custom-input__error" style={{ color: '#e25151' }}>{errors.tel.message}</p>}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input
                type="number"
                id="person"
                placeholder="Количество участников"
                {...register('person', {
                  required: 'Укажите число участников',
                  min: {
                    value: minPeople,
                    message: `Минимум участников для этого квеста: ${minPeople}`,
                  },
                  max: {
                    value: maxPeople,
                    message: `Максимум участников для этого квеста: ${maxPeople}`,
                  },
                })}
              />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                {...register('children')}
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
              {...register('user-agreement', { required: 'Необходимо согласие с правилами' })}
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
