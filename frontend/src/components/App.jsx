import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import routes from '../routes.js';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';

const App = () => {
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.mainPath()}
          element={
          isLoggedIn
            ? <MainPage />
            : <Navigate to={routes.loginPath()} />
}
        />
        <Route path={routes.loginPath()} element={<LoginPage />} />
        <Route path={routes.anyPath()} element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
