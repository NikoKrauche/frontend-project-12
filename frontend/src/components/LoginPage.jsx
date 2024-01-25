import React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import Navigation from './Navigation.jsx';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./images/login.png" className="rounded-circle" alt="Войти" />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.onSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      type="text"
                      value={formik.values.login}
                      onChange={formik.handleChange}
                      placeholder="Ваш ник"
                      required
                      autoComplete="nickname"
                      autoFocus
                    />
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-3" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      required
                      autoComplete="current-password"
                    />
                    <Form.Label>Пароль</Form.Label>
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="outline-primary"
                    type="submit"
                  >
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
