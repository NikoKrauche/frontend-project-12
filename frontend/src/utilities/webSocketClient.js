import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';

export default (dispatch) => {
  const socket = io();
  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    dispatch(removeChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel({ id: channel.id, changes: channel }));
  });
};
