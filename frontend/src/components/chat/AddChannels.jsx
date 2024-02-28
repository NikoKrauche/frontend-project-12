import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { AddChannelSvg } from './SvgElements.jsx';
import { modalOpen } from '../../slices/modalSlice.js';

const AddChannels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('Chat.channel')}</b>
      <Button
        className="p-0 text-primary btn-link"
        onClick={() => dispatch(modalOpen({ type: 'add' }))}
      >
        <AddChannelSvg />
        <span className="visually-hidden">+</span>
      </Button>
    </div>
  );
};

export default AddChannels;
