const routes = {
  mainPath: () => '/',
  loginPath: () => '/login',
  anyPath: () => '*',
  createNewUser: () => '/api/v1/signup',
  authorization: () => '/api/v1/login',
  channels: () => '/api/v1/channels',
  editChannel: (id) => `/api/v1/channels/${id}`,
  removeChannel: (id) => `/api/v1/channels/${id}`,
  messages: () => '/api/v1/messages',
  editMessage: (id) => `/api/v1/messages/${id}`,
  removeMessage: (id) => `/api/v1/messages/${id}`,
};

export default routes;
