import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import browserHistory from '../../browser-history';
import { AppRoute, AuthorizationStatus } from '../../const';
import Layout from '../layout/layout';
import MainPage from '../../pages/main-page/main-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import PrivateRoute from '../private-route/private-route';
import PublicRoute from '../public-route/public-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { fetchMyQuestsAction, fetchQuestsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { getIsDataLoading, getQuests } from '../../store/data-process/data-process.selectors';
import LoadingScreen from '../loading-screen/loading-screen';

const App = () => {
  const quests = useAppSelector(getQuests);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestsAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchMyQuestsAction());
    }
  }, [dispatch, authorizationStatus]);

  if (isOffersDataLoading && quests.length === 0) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout/>}
        >
          <Route
            index
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Quest}
          >
            <Route path=":id"
              element={<QuestPage/>}
            >
            </Route>
          </Route>
          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BookingPage/>
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
                <MyQuestsPage/>
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

