import {Link, NavLink, Outlet} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, getAuthorizationStatus} from '../../const';

// const getLayoutState = (pathname: AppRoute) => {
//   let shouldRenderLinkMyQuests = true;
//   if (pathname === AppRoute.Quest
//     || pathname === AppRoute.Login
//     || pathname === AppRoute.Contacts) {
//     shouldRenderLinkMyQuests = false;
//   }

//   return {shouldRenderLinkMyQuests};
// };


const Layout = () => {
  // const {pathname} = useLocation();
  const isAuthorized = getAuthorizationStatus === AuthorizationStatus.Auth;
  // const {shouldRenderLinkMyQuests} = getLayoutState(pathname as AppRoute);
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container container--size-l">
          <Link
            to={AppRoute.Root}
          >
            <span className="logo header__logo">
              <svg width="134" height="52" aria-hidden="true">
                <use href="#logo"/>
              </svg>
            </span>
          </Link>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <NavLink
                  className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
                  to={AppRoute.Root}
                  end
                >Квесты
                </NavLink>
              </li>
              <li className="main-nav__item">
                <NavLink
                  className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
                  to={AppRoute.Contacts}
                >Контакты
                </NavLink>
              </li>
              {getAuthorizationStatus === AuthorizationStatus.Auth ? (
                <li className="main-nav__item">
                  <NavLink
                    className={({ isActive }) => `link ${isActive ? 'active' : ''}`}
                    to={AppRoute.MyQuests}
                  >Мои бронирования
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </nav>
          <div className="header__side-nav">
            <Link
              className={`btn header__side-item ${isAuthorized ? 'btn--accent' : 'header__login-btn'}`}
              to={AppRoute.Root}
            >{isAuthorized ? 'Выйти' : 'Вход'}
            </Link>
            <a
              className="link header__side-item header__phone-link"
              href="tel:88003335599"
            >8 (000) 111-11-11
            </a>
          </div>
        </div>
      </header>
      <Outlet/>
      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#"
                  aria-label="Skype"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use href="#icon-skype-default"/>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use href="#icon-skype-interactive"/>
                  </svg>
                </a>
              </li>
              <li className="socials__item">
                <a
                  className="socials__link"
                  href="#" aria-label="ВКонтакте"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use href="#icon-vk-default"/>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use href="#icon-vk-interactive"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Layout;
