import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { Col, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { InputMessageSvg } from './SvgElements.jsx';
import { addMessage, getMessages } from '../../services/chatApi.js';

const Messages = ({ currentChannel }) => {
  const { t } = useTranslation();
  const [add] = addMessage();

  const { data: dataMessages, isLoading } = getMessages();
  const userData = useSelector((state) => state.auth.user);
  const activeChannel = useSelector((state) => state.channels.entities[currentChannel]) || { name: 'general' };
  const messages = dataMessages && dataMessages
    .filter((message) => message.channelId === currentChannel);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const filteredMessage = leoProfanity.clean(values.body);
      try {
        const newMessage = {
          body: filteredMessage,
          channelId: currentChannel,
          username: userData.username,
        };
        await add(newMessage);
        resetForm();
      } catch (e) {
        if (e.message === 'Network Error') {
          toast.error(t('Chat.error.network'));
        }
        formik.setStatus({ error: true });
      }
    },
  });

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('Chat.messageCounter', { count: messages?.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {!isLoading && messages.map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2">
              <b>
                {username}
                :
              </b>
              {' '}
              {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="input-group">
              <Form.Control
                name="body"
                aria-label={t('Chat.inputLabel')}
                placeholder={t('Chat.placeholder')}
                className="border-0 p-0 ps-2 form-control"
                autoFocus
                value={formik.values.body}
                onChange={formik.handleChange}
              />
              <Button
                type="submit"
                className="p-0 text-primary btn-link"
                variant="outline-light"
                disabled={formik.isSubmitting}
              >
                <InputMessageSvg />
                <span className="visually-hidden">{t('Chat.buttonSubmit')}</span>
              </Button>
            </Form.Group>
          </Form>
          {formik.status && formik.status.error && (
            <div className="text-danger small">{t('Chat.error.network')}</div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default Messages;
