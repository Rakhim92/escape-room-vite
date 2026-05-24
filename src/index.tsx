import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { ToastContainer } from 'react-toastify'; // Импортируем контейнер
import 'react-toastify/dist/ReactToastify.css'; // Импортируем стили
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </Provider>
  </React.StrictMode>
);
