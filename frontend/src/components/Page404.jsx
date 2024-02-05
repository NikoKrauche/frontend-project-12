import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import routes from '../routes.js';
import NavigationBar from './Navigation.jsx';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src="./images/404.png" />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти на главную страницу
        </p>
        <Button
          className="w-25 "
          variant="secondary"
          type="button"
          onClick={() => navigate(routes.mainPath(), { replace: false })}
        >
          На главную
        </Button>
      </div>
    </>
  );
};

export default Page404;
