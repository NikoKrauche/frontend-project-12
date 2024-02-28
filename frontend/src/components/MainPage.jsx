import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './Navigation.jsx';
import Channels from './chat/Channels.jsx';
import Modal from './chat/modal/Modal.jsx';

const MainPage = () => (
  <div className="d-flex flex-column vh-100">
    <NavigationBar />
    <Container className="h-100 my-4 overflow-hidden rounded shadow ">
      <Channels />
      <Modal />
    </Container>
  </div>
);

export default MainPage;
