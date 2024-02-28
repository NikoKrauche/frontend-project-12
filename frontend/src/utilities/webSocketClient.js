import { io } from 'socket.io-client';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';
import { chatApi } from '../services/chatApi.js';


export default (dispatch) => {

  const socket = io();
  socket.on('newMessage', () => {
    dispatch(chatApi.util.invalidateTags(['Messages']))
  });
  socket.on('newChannel', () => {
    dispatch(chatApi.util.invalidateTags(['Channels']))
  });
  socket.on('removeChannel', () => {
    dispatch(chatApi.util.invalidateTags(['Channels']))
  });
  socket.on('renameChannel', () => {
    dispatch(chatApi.util.invalidateTags(['Channels']))
  });
};
