// import React, { useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './Navigation.jsx';
import Channels from './chatComponents/Channels.jsx';

const MainPage = () => (
  <div className="d-flex flex-column vh-100">
    <NavigationBar />
    <Container className="h-100 my-4 overflow-hidden rounded shadow ">
      <Channels />
    </Container>
  </div>
);

export default MainPage;
