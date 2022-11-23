const express = require('express');
const bcrypt = require('bcrypt');
const prisma = require('../../db');

const router = express.Router();
const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Invalid Payload' });
  }

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    res.status(409).json({
      message: 'email already in use',
    });

    return;
  }

  const usernameExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (usernameExists) {
    return res.status(409).json({
      message: 'username already in use',
    });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    await prisma.user.create({
      data: {
        username,
        password: hash,
        email,
      },
    });
    return res.sendStatus(201);
  });
});

module.exports = router;
