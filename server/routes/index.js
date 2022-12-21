const signupRouter = require('./user/signup');
const signinRouter = require('./user/signin');
const refreshTokenRouter = require('./user/refresh-token');
const logoutRouter = require('./user/logout');
const createBroadcastGroupRouter = require('./group/create-broadcast-group');

module.exports = {
  signupRouter,
  signinRouter,
  refreshTokenRouter,
  logoutRouter,
  createBroadcastGroupRouter
};
