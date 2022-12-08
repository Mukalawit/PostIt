const express = require('express');
const { User } = require('../../models');
const HttpError = require('../../utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Invalid Payload' });
  }

  const user = new User(username, email, password);
  try {
    await user.save();
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
