const express = require('express');
const { User } = require('../../models');
const { getBearerToken } = require('../../utils/token-helpers');

const router = express.Router();

router.post('/logout', async (req, res) => {
  const token = getBearerToken(req);
  await User.logout({ token });
  return res.status(204).json({
    message: 'Logged out'
  });
});

module.exports = router;
