import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import { loginSuccess } from '../slices/authorizationSlice.js';

import routes from '../utilities/routes.js';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import Page404 from './Page404.jsx';
import SignupPage from './SignupPage.jsx';

const App = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.user);
  if (data) dispatch(loginSuccess(data));

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
