import React, { useEffect } from 'react';
import { Col, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchMessages, sendMessage, selectors } from '../../slices/messagesSlice';

const Messages = ({ currentChannel, userData }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.channels.entities[currentChannel]) || { name: 'general' };
  const messages = useSelector(selectors.selectAll)
    .filter((message) => message.channelId === currentChannel);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => { dispatch(fetchMessages(userData.token)); });

  async function handleSubmit(values, { resetForm }) {
    try {
      const newMessage = {
        body: values.body,
        channelId: currentChannel,
        username: userData.username,
      };

      await dispatch(sendMessage({ token: userData.token, newMessage }));
      resetForm();
    } catch (error) {
      formik.setStatus({ error: true });
    }
  }
  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('Chat.messageCounter', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map(({ id, body, username }) => (
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <span className="visually-hidden">{t('Chat.buttonSubmit')}</span>
              </Button>
            </Form.Group>
          </Form>
          {formik.status && formik.status.error && (
            <div className="text-danger small">{t('Chat.error.errorMessage')}</div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default Messages;
