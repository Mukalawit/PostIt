const signupRouter = require('./user/signup');
const signinRouter = require('./user/signin');
const refreshTokenRouter = require('./user/refresh-token');
const logoutRouter = require('./user/logout');

module.exports = {
  signupRouter,
  signinRouter,
  refreshTokenRouter,
  logoutRouter
};
