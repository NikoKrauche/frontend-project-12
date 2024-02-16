const routes = {
  mainPath: () => '/',
  loginPath: () => '/login',
  anyPath: () => '*',
  createNewUser: () => '/api/v1/signup',
  authorization: () => '/api/v1/login',
  channels: () => '/api/v1/channels',
  messages: () => '/api/v1/messages',
};

export default routes;
