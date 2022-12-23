require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyRefreshToken(token) {
  try {
    const record = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return record;
  } catch (error) { return false; }
}
module.exports = verifyRefreshToken;
