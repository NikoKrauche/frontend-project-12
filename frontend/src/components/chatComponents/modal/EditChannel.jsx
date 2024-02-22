import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { renameChannelThunk, selectors } from '../../../slices/channelsSlice.js';
import { modalClose } from '../../../slices/modalSlice.js';

const EditChannel = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const input = useRef(null);

  const { isShow } = useSelector((state) => state.modal);
  const { token } = useSelector((state) => state.auth.user);

  const currentChannel = useSelector((state) => selectors.selectAll(state)
    .find((channel) => channel.id === id));

  const channelNames = useSelector((state) => selectors.selectAll(state)
    .map((channel) => channel.name));

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('Modal.error.nameRequired'))
      .min(3, t('Modal.error.nameLength'))
      .max(20, t('Modal.error.nameLength'))
      .notOneOf(channelNames, t('Modal.error.nameDuplicate')),
  });

  const handleSubmit = async ({ name }) => {
    const filteredName = leoProfanity.clean(name);
    try {
      await dispatch(renameChannelThunk({ token, name: filteredName, id }));
      dispatch(modalClose());
      toast.success(t('Modal.toastEdit'));
    } catch (error) {
      formik.setStatus({ error: true });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    input.current.focus();
    input.current.setSelectionRange(0, formik.values.name.length);
  });

  return (
    <Modal
      show={isShow}
      onHide={() => dispatch(modalClose())}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('Modal.edit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              id="modal-edit"
              name="name"
              ref={input}
              onChange={formik.handleChange}
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

export default EditChannel;
