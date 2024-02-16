import React, { useEffect } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Messages from './Messages.jsx';
import AddChannels from './AddChannels.jsx';
import { fetchChannels, setChannel, selectors } from '../../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => { dispatch(fetchChannels(userData.token)); });
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const channels = useSelector(selectors.selectAll);

  const handleClick = (id) => {
    dispatch(setChannel(id));
  };

  return (
    <Row className="h-100 bg-white flex-md-row">
      <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <AddChannels />
        {channels && (
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map(({ id, name }) => (
            <li key={id} className="nav-item w-100">
              <Button
                variant={currentChannel === id ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleClick(id)}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            </li>
          ))}
        </ul>
        )}
      </Col>
      <Messages currentChannel={currentChannel} userData={userData} />
    </Row>
  );
};

export default Channels;
