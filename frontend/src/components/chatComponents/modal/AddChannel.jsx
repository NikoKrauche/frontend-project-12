import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { addChannelThunk, selectors } from '../../../slices/channelsSlice.js';
import { modalClose } from '../../../slices/modalSlice.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isShow } = useSelector((state) => state.modal);
  const { token } = useSelector((state) => state.auth.user);

  const channelNames = useSelector((state) => selectors.selectAll(state)
    .map((channel) => channel.name));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('Modal.error.nameRequired'))
      .min(3, t('Modal.error.nameLength'))
      .max(20, t('Modal.error.nameLength'))
      .notOneOf(channelNames, t('Modal.error.nameDuplicate')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      await dispatch(addChannelThunk({ token, name: values.name }));
      dispatch(modalClose());
    } catch (error) {
      formik.setStatus({ error: true });
    }
  }

  return (
    <Modal
      show={isShow}
      onHide={() => dispatch(modalClose())}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('Modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              id="name"
              name="name"
              autoFocus
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Label htmlFor="name" className="visually-hidden">
              {t('Modal.name')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => dispatch(modalClose())}
              >
                {t('Modal.cancel')}
              </Button>
              <Button type="submit" disabled={formik.isSubmitting}>
                {t('Modal.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
