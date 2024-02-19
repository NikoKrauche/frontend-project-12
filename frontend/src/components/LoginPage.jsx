import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavigationBar from './Navigation.jsx';
import routes from '../utilities/routes.js';
import {
  loginSuccess, loginFailure,
} from '../slices/authorizationSlice.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(routes.authorization(), values);

      dispatch(loginSuccess(data));
      localStorage.setItem('token', JSON.stringify(data));
      navigate(routes.mainPath());
    } catch (e) {
      dispatch(loginFailure(e));
    }
  };

  const formik = useFormik({
    initialValues: {
      username: null,
      password: null,
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <NavigationBar />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./images/logo.png" className="rounded-circle" alt={t('LoginPage.login')} />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('LoginPage.login')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="text"
                      placeholder={t('LoginPage.username')}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={error}
                      required
                      autoComplete="nickname"
                      autoFocus
                    />
                    <Form.Label>{t('LoginPage.username')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t('LoginPage.password')}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={error}
                      required
                      autoComplete="current-password"
                    />
                    <Form.Label>{t('LoginPage.password')}</Form.Label>
                    {error && <Form.Control.Feedback type="invalid" className="invalid-feedback">{t('LoginPage.error.valid')}</Form.Control.Feedback> }
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {t('LoginPage.login')}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-top" style={{ marginTop: '70px', marginRight: '15px', textAlign: 'right' }}>
        <Link to="/signup">{t('LoginPage.register')}</Link>
      </div>
    </>
  );
};

export default LoginPage;
