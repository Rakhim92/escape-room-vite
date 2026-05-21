import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PublicRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PublicRoute({ authorizationStatus, children }: PublicRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root} />
      : children
  );
}

export default PublicRoute;
