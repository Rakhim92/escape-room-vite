import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

const LoginPage = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();

      if (email && password) {
        dispatch(loginAction({
          login: email,
          password: password,
        }));
      }
    }
  };
  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp,
            img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Адрес электронной почты"
                    required
                  />
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">Пароль</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    pattern="^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S+$"
                    title="Пароль должен содержать минимум одну букву и одну цифры без пробелов"
                    required
                  />
                </div>
              </div>
              <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input type="checkbox" id="id-order-agreement" name="user-agreement" required/>
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"/>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с
                <a
                  className="link link--active-silver link--underlined"
                  href="#"
                >правилами обработки персональных данных
                </a>&nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
