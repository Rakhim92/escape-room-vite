import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuests from '../../pages/my-quests/my-quests';
import PrivateRoute from '../private-route/private-route';
import PublicRoute from '../public-route/public-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { TBookingLocation, TExtendedQuest, TQuest} from '../../types';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type TAppProps = {
  quests: TQuest[];
  extendedQuests: TExtendedQuest[];
  bookingLocations: TBookingLocation[];
}

const App = ({quests, extendedQuests, bookingLocations}: TAppProps) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout/>}
        >
          <Route
            index
            element={
              <MainPage
                quests = {quests}
              />
            }
          />
          <Route
            path={AppRoute.Quest}
          >
            <Route path=":id"
              element={
                <QuestPage
                  extendedQuests = {extendedQuests}
                />
              }
            >
            </Route>
          </Route>
          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BookingPage
                  extendedQuests={extendedQuests}
                  bookingLocations={bookingLocations}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PublicRoute authorizationStatus={authorizationStatus}>
                <LoginPage/>
              </PublicRoute>
            }
          />

          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyQuests/>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundPage/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

