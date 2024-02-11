import React, { useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchMessages, selectors } from '../../slices/messagesSlice.js';

const Messages = ({ currentChannel, token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchMessages(token)); });

  const activeChannel = useSelector((state) => state.channels.entities[currentChannel]) || null;
  const comments = useSelector(selectors.selectAll)
    .filter((comment) => comment.id === currentChannel);

  return (
    <Col className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel?.name}
            </b>
          </p>
          <span className="text-muted">
            {comments.length}
            {' '}
            {t('Chat.messageCounter')}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {comments.map(({ id, body, name }) => (
            <div key={id} className="text-break mb-2">
              <b>{name}</b>
              :
              {body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input name="body" aria-label={t('Chat.inputLabel')} placeholder={t('Chat.placeholder')} className="border-0 p-0 ps-2 form-control" value="" />
              <Button
                type="submit"
                className="p-0 text-primary btn-link"
                variant="outline-light"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
                <span className="visually-hidden">{t('Chat.buttonSubmit')}</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
