const express = require('express');
const { User } = require('../../models');
const { HttpError } = require('../../utils/errors');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Invalid Payload' });
  }

  try {
    const tokens = await User.login(username, password);
    return res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
