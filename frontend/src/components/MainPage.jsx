import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavigationBar from './Navigation.jsx';

const MainPage = () => (
  <>
    <NavigationBar />
    <nav>
      <ul>
        <li>
          <Link to="/login">Логин</Link>
        </li>
        <li>
          Page Two
        </li>
      </ul>
    </nav>
    <hr />
    <Outlet />
  </>
);

export default MainPage;
