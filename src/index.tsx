import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import {quests} from './mocks/quests';
import {extendedQuests} from './mocks/extended-quests';
import {bookingLocations} from './mocks/places';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        quests = {quests}
        extendedQuests = {extendedQuests}
        bookingLocations = {bookingLocations}
      />
    </Provider>
  </React.StrictMode>
);
