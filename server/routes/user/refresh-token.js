const express = require('express');
const { User } = require('../../models');
const { HttpError } = require('../../utils/errors');
const { getBearerToken } = require('../../utils/token-helpers');

const router = express.Router();

router.post('/refresh-token', async (req, res) => {
  // get token from auth header
  const token = getBearerToken(req);

  if (!token) {
    return res.status(400).json({ message: 'Invalid Payload' });
  }
  try {
    const tokens = await User.refreshToken({ token });

    return res.status(201).json(tokens);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
