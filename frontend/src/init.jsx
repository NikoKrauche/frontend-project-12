import i18next from 'i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
