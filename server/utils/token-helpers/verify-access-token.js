require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyAccessToken(token) {
  try {
    const record = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(record)
    return record;
  } catch (error) { return false; }
}
module.exports = verifyAccessToken;
