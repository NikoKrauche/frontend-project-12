const routes = {
  mainPath: () => '/',
  loginPath: () => '/login',
  anyPath: () => '*',
  createNewUser: () => '/api/v1/signup',
  authorization: () => '/api/v1/login',
  channels: (id = null) => (id ? `/api/v1/channels/${id}` : '/api/v1/channels'),
  messages: (id = null) => (id ? `/api/v1/messages/${id}` : '/api/v1/messages'),
};

export default routes;
