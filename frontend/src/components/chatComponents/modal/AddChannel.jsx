import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { modalClose } from '../../../slices/modalSlice.js';
import { setChannel } from '../../../slices/channelsSlice.js';
import { addChannel, getChannels } from '../../../services/chatApi.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [add] = addChannel();

  const { data: channels } =  getChannels();
  const { isShow } = useSelector((state) => state.modal);
  const channelNames = channels.map((channel) => channel.name);

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
    onSubmit: async ({ name }) => {
      const filteredName = leoProfanity.clean(name);
      const newChannel = { name: filteredName };
      try {
        const { data } = await add(newChannel);
        dispatch(modalClose());
        dispatch(setChannel(data.id));
        toast.success(t('Modal.toastAdd'));
      } catch (error) {
        formik.setStatus({ error: true });
      }
    },
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
