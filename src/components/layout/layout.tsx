import {Outlet} from 'react-router-dom';
// import {AppRoute} from '../../const';

// const getLayoutState = (pathname: AppRoute) => {
//   let mainTagClassName = 'page-content';

//   if (pathname === AppRoute.Quest) {
//     mainTagClassName = 'quest-page';
//   } else if (pathname === AppRoute.Login) {
//     mainTagClassName = 'login';
//   }

//   return {mainTagClassName};
// };
// const {pathname} = useLocation();
// const {mainTagClassName} = getLayoutState(pathname as AppRoute);

const Layout = () => (
  <div className="wrapper">
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <a className="link active" href="index.html">Квесты</a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="contacts.html">Контакты</a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="my-quests.html">Мои бронирования</a>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <a className="btn btn--accent header__side-item" href="#">Выйти</a>
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
    <Outlet/>
    <footer className="footer">
      <div className="container container--size-l">
        <div className="socials">
          <ul className="socials__list">
            <li className="socials__item">
              <a className="socials__link" href="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-skype-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-skype-interactive"></use>
                </svg>
              </a>
            </li>
            <li className="socials__item">
              <a className="socials__link" href="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-vk-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use xlinkHref="#icon-vk-interactive"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);


export default Layout;
