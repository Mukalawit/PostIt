const express = require('express');
const bodyParser = require('body-parser');
const { signupRouter } = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user', signupRouter);
module.exports = app;
