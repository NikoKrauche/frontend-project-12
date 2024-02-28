import React, { useEffect } from 'react';
import {
  Col, Button, Row, Dropdown, ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Messages from './Messages.jsx';
import AddChannels from './AddChannels.jsx';
import { setChannel } from '../../slices/channelsSlice.js';
import { getChannels } from '../../services/chatApi.js';
import { modalOpen } from '../../slices/modalSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const { data: channels, isLoading } = getChannels();

  const handleClick = (id) => {
    dispatch(setChannel(id));
  };


  return (
    <Row className="h-100 bg-white flex-md-row">
      <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <AddChannels />
        {channels && (
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map(({ id, name, removable }) => (
            <li key={id} className="nav-item w-100">
              {!removable && (
              <Button
                variant={currentChannel === id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleClick(id)}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
              )}
              {removable && (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    variant={currentChannel === id ? 'secondary' : 'light'}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => handleClick(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant={currentChannel === id ? 'secondary' : 'light'}
                    id={`dropdown-${id}`}
                  >
                    <span className="visually-hidden">
                      {t('Channels.channelManagement')}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => dispatch(modalOpen({ modal: 'remove', id }))}
                    >
                      {t('Channels.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(modalOpen({ modal: 'edit', id }))}
                    >
                      {t('Channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </li>
          ))}
        </ul>
        )}
      </Col>
      <Messages currentChannel={currentChannel} />
    </Row>
  );
};

export default Channels;
