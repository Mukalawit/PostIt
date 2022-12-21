const generateAccessToken = require('./generate-access-token');
const generateRefreshToken = require('./generate-refresh-token');
const getBearerToken = require('./get-bearer-token');
const verifyRefreshToken = require('./verify-refresh-token');
const verifyAccessToken = require('./verify-access-token');
const authenticateToken = require('./authenticate-token');

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getBearerToken,
  verifyRefreshToken,
  verifyAccessToken,
  authenticateToken
};
