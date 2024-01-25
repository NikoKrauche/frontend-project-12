import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainPage = () => (
  <>
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
