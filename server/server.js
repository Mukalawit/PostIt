const express = require('express');
const bodyParser = require('body-parser');
const {
    signupRouter,
    signinRouter,
    refreshTokenRouter,
    logoutRouter,
    createBroadcastGroupRouter,
    addUsersToGroupRouter,

} = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', signupRouter);
app.use('/api/user', signinRouter);
app.use('/api', logoutRouter);
app.use('/api', refreshTokenRouter);
app.use('/api', createBroadcastGroupRouter);
app.use('/api/group', addUsersToGroupRouter);
module.exports = app;
