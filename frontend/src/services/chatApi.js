import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth.user;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
        providesTags: ['Messages'],
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
        providesTags: ['Messages'],
      }),
    }),
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
        providesTags: ['Channels'],
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ editedChannel, id }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: editedChannel,
        providesTags: ['Channels'],
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
        providesTags: ['Messages', 'Channels'],
      }),
    }),
  }),
});

const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = chatApi;

export {
  useGetMessagesQuery as getMessages,
  useAddMessageMutation as addMessage,
  useRemoveMessageMutation as removeMessage,
  useGetChannelsQuery as getChannels,
  useAddChannelMutation as addChannel,
  useRenameChannelMutation as renameChannel,
  useRemoveChannelMutation as removeChannel,
};
