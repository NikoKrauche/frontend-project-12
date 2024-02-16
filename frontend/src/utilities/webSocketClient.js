import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice.js';

export default (dispatch) => {
  const socket = io();
  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
};
