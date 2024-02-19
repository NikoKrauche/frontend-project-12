import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loginSuccess } from '../slices/authorizationSlice.js';
import sockets from '../utilities/webSocketClient.js';
import routes from '../utilities/routes.js';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';
import SignupPage from './SignupPage.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => sockets(dispatch));

  const token = JSON.parse(localStorage.getItem('token'));
  if (token) dispatch(loginSuccess(token));

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.mainPath()}
          element={
            isAuthenticated
              ? <MainPage />
              : <Navigate to={routes.loginPath()} />
}
        />
        <Route path={routes.loginPath()} element={<LoginPage />} />
        <Route path={routes.signupPath()} element={<SignupPage />} />
        <Route path={routes.anyPath()} element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
