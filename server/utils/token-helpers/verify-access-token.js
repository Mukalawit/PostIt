require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HttpError } = require('../errors');

function verifyAccessToken(token) {
  const record = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!record) {
    throw new HttpError(401, 'Not Authorised');
  }
  return record;
}
module.exports = verifyAccessToken;
