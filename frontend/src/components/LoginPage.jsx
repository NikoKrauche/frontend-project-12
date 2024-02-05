import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './Navigation.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isAuthorizationError, setAuthorizationState] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setAuthorizationState(false);
        const response = await axios.post(routes.authorization(), values);
        localStorage.setItem('authToken', response.data);
        navigate(routes.mainPath());
      } catch (error) {
        setAuthorizationState(true);
      }
    },
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
                  <img src="./images/login.png" className="rounded-circle" alt="Войти" />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Ваш ник"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={isAuthorizationError}
                      required
                      autoComplete="nickname"
                      autoFocus
                    />
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={isAuthorizationError}
                      required
                      autoComplete="current-password"
                    />
                    <Form.Label>Пароль</Form.Label>
                    {isAuthorizationError && <Form.Control.Feedback type="invalid" className="invalid-feedback">Неверные имя пользователя или пароль</Form.Control.Feedback> }
                  </Form.Group>
                  <Button className="w-100" variant="outline-primary" type="submit">
                    Войти
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

export default LoginPage;
