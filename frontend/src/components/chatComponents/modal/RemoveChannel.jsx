import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { removeChannelThunk } from '../../../slices/channelsSlice.js';
import { modalClose } from '../../../slices/modalSlice.js';

const EditChannel = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isShow } = useSelector((state) => state.modal);
  const { token } = useSelector((state) => state.auth.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await dispatch(removeChannelThunk({ token, id }));
      dispatch(modalClose());
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

export default EditChannel;
