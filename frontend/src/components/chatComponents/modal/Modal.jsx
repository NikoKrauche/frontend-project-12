import React from 'react';
import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import EditChannel from './EditChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const Modal = () => {
  const { isShow, modal, id } = useSelector((state) => state.modal);
  if (!isShow) return null;

  const activeModal = {
    add: <AddChannel />,
    edit: <EditChannel id={id} />,
    remove: <RemoveChannel id={id} />,
  };

  return (
    activeModal[modal]
  );
};

export default Modal;
