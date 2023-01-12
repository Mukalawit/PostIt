const signupRouter = require('./user/signup');
const signinRouter = require('./user/signin');
const refreshTokenRouter = require('./user/refresh-token');
const logoutRouter = require('./user/logout');
const createBroadcastGroupRouter = require('./group/create-broadcast-group');
const addUsersToGroupRouter = require('./group/add-users-to-group');
const postGroupMessageRouter = require('./message/post-group-message');
const viewGroupMessageRouter = require('./message/view-group-message')

module.exports = {
    signupRouter,
    signinRouter,
    refreshTokenRouter,
    logoutRouter,
    createBroadcastGroupRouter,
    addUsersToGroupRouter,
    postGroupMessageRouter,
    viewGroupMessageRouter
};
