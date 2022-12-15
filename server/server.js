const express = require('express');
const bodyParser = require('body-parser');
const {
  signupRouter, signinRouter, refreshTokenRouter, logoutRouter
} = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', signupRouter);
app.use('/api/user', signinRouter);
module.exports = app;
