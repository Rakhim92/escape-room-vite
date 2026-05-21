import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const NotFoundPage = ():JSX.Element => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '0',
    flexDirection: 'column'
  }}
  >
    <h1 className="error-page__title">404.</h1>
    <p className="error-page__subtitle">Page not found</p>
    <Link
      className="btn btn--accent btn--cta error-page__link"
      to={AppRoute.Root}
    >Go to main page
    </Link>
  </div>
);

export default NotFoundPage;
