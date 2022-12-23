const getBearerToken = require('./get-bearer-token');
const verifyAccessToken = require('./verify-access-token');

function authenticateToken(req, res, next) {
  const token = getBearerToken(req);
  if (token == null) {
    return res.status(401).json({ message: 'Not Authorized' });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.user = user;
  next();
}

module.exports = authenticateToken;
