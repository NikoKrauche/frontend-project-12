import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../utilities/routes.js';
import NavigationBar from './Navigation.jsx';

const Page404 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <NavigationBar />
      <div className="text-center">
        <img alt={t('Page404.h')} className="img-fluid h-25" src="./images/404.png" />
        <h1 className="h4 text-muted">{t('Page404.h')}</h1>
        <p className="text-muted">
          {t('Page404.p')}
        </p>
        <Button
          className="w-25 "
          variant="secondary"
          type="button"
          onClick={() => navigate(routes.mainPath(), { replace: false })}
        >
          {t('Page404.mainPage')}
        </Button>
      </div>
    </>
  );
};

export default Page404;
