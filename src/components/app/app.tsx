import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import browserHistory from '../../browser-history';
import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import MainPage from '../../main-page/main-page';
import QuestPage from '../../quest-page/quest-page';
import ContactsPage from '../../contacts-page/contacts-page';
import LoginPage from '../../login-page/login-page';
import BookingPage from '../../booking-page/booking-page';
import MyQuests from '../../my-quests/my-quests';

const App = () => (
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
          element={<QuestPage/>}
        />
        <Route
          path={AppRoute.Contacts}
          element={<ContactsPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Booking}
          element={<BookingPage/>}
        />
        <Route
          path={AppRoute.MyQuests}
          element={<MyQuests/>}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

