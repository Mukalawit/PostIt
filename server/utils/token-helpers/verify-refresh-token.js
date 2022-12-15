require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HttpError } = require('../errors');

function verifyRefreshToken(token) {
  const record = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  if (!record) {
    throw new HttpError(401, 'Not Authorised');
  }
  return record;
}
module.exports = verifyRefreshToken;
