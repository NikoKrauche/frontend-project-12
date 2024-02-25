import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import NavigationBar from './Navigation.jsx';
import routes from '../utilities/routes.js';
import { loginSuccess } from '../slices/authorizationSlice.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('SignupPage.error.required'))
      .min(3, t('SignupPage.error.nameLength'))
      .max(20, t('SignupPage.error.nameLength')),
    password: Yup.string()
      .required(t('SignupPage.error.required'))
      .min(6, t('SignupPage.error.passwordLength')),
    passwordConfirmation: Yup.string()
      .required(t('SignupPage.error.required'))
      .oneOf([Yup.ref('password')], t('SignupPage.error.passwordMatch')),
  });

  const handleSubmit = async ({ username, password }) => {
    try {
      const { data } = await axios.post(routes.createNewUser(), { username, password });

      dispatch(loginSuccess(data));
      localStorage.setItem('userData', JSON.stringify(data));
      navigate(routes.mainPath());
    } catch (e) {
      if (e.message === 'Network Error') {
        toast.error(t('Chat.error.network'));
      }
      if (e.response && e.response.status === 409) {
        formik.setStatus({ serverError: true });
      } else {
        formik.setStatus({ error: true });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: null,
      password: null,
      passwordConfirmation: '',
    },
    validationSchema,
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
                  <img src="./images/logo.png" className="rounded-circle" alt={t('SignupPage.registration')} />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('SignupPage.registration')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="username"
                      name="username"
                      type="text"
                      placeholder={t('SignupPage.username')}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                      required
                      autoComplete="nickname"
                      autoFocus
                    />
                    <Form.Label  htmlFor="username">{t('SignupPage.username')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t('SignupPage.password')}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                      required
                      autoComplete="new-password"
                    />
                    <Form.Label  htmlFor="password">{t('SignupPage.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder={t('SignupPage.passwordConfirmation')}
                      value={formik.values.passwordConfirmation}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={formik.touched.passwordConfirmation
                         && !!formik.errors.passwordConfirmation}
                      required
                      autoComplete="new-password"
                    />
                    <Form.Label htmlFor="passwordConfirmation">{t('SignupPage.passwordConfirmation')}</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {formik.status && formik.status.serverError && (
                  <Alert variant="danger">{t('SignupPage.error.usernameExists')}</Alert>
                  )}
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {t('SignupPage.registrationBtn')}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
