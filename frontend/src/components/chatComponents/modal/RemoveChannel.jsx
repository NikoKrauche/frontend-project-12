import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { modalClose } from '../../../slices/modalSlice.js';
import { setChannel } from '../../../slices/channelsSlice.js';
import { removeChannel, getMessages, removeMessage } from '../../../services/chatApi.js';

const RemoveChannel = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [remove] = removeChannel();
  const [removeM] = removeMessage();
  const { data: messages } = getMessages();

  const messagesId = messages.filter((message) => message.channelId === id);

  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const { isShow } = useSelector((state) => state.modal);
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await remove(id);
      if (Number(currentChannel) === Number(id)) dispatch(setChannel('1'));
      dispatch(modalClose()); 
      messagesId.map((message) => removeM(message.id));
      toast.success(t('Modal.toastDelete'));
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={isShow}
      onHide={() => dispatch(modalClose())}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('Modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('Modal.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => dispatch(modalClose())}
          >
            {t('Modal.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="danger"
            onClick={handleSubmit}
          >
            {isSubmitting ? t('Modal.deleting') : t('Modal.delete')}
          </Button>
        </div>
        {error && <p className="text-danger">{t('Modal.error.network')}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
