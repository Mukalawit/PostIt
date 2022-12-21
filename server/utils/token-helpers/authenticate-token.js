const { HttpError } = require('../errors');
const getBearerToken = require('./get-bearer-token');
const verifyAccessToken = require('./verify-access-token');

function authenticateToken(req, res, next) {
  const token = getBearerToken(req);
  if (token == null) {
    throw new HttpError(401, 'Not Authorised');
  }
  const user = verifyAccessToken(token);
  if (!user) {
    throw new HttpError(401, 'Invalid Token');
  }
  req.user = user;
  next();
}

module.exports = authenticateToken;
