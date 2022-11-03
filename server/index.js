const { PrismaClient } = require('@prisma/client');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const saltRounds = 10;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/user/signup', async (req, res) => {
  const {
    username, password, email
  } = req.body;
  if (!username || !password || !email) {
    return res.sendStatus(400);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    res.status(409).json({
      message: 'user already exists'
    });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }
    await prisma.user.create({
      data: {

        username,
        password: hash,
        email

      }
    });
    res.sendStatus(201);
  });
});
app.listen(3000, () => {
  console.log('Listening');
});
