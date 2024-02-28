const routes = {
  mainPath: () => '/',
  loginPath: () => '/login',
  signupPath: () => '/signup',
  anyPath: () => '*',
  createNewUser: () => '/api/v1/signup',
  authorization: () => '/api/v1/login',
};

export default routes;
