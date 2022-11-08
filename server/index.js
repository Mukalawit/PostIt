require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const saltRounds = 10;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// eslint-disable-next-line require-jsdoc
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// eslint-disable-next-line require-jsdoc
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
// eslint-disable-next-line require-jsdoc
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

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
  } else {
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
  }
});

app.post('/api/user/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(400);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      username
    }
  });
  if (userExists) {
    bcrypt.compare(password, userExists.password, async (err, result) => {
      if (!result) {
        return res.sendStatus(401);
      }
      if (err) {
        return res.sendStatus(500);
      }

      const accessToken = generateAccessToken(userExists);
      const refreshToken = generateRefreshToken(userExists);

      await prisma.RefreshTokens.create({
        data: {
          token: refreshToken
        }
      });
      res.status(200).json({ accessToken, refreshToken });
    });
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/refresh-token', async (req, res) => {
  const token = await prisma.RefreshTokens.findUnique({
    where: {
      token: req.body.refreshToken
    }
  });

  if (!token) return res.status(400);

  await prisma.RefreshTokens.delete({
    where: {
      token: req.body.refreshToken
    }
  });

  const accessToken = generateAccessToken({ user: req.body.username });
  const refreshToken = generateRefreshToken({ user: req.body.username });

  await prisma.RefreshTokens.create({
    data: {
      token: refreshToken
    }
  });

  res.status(200).json({ accessToken, refreshToken });
});

app.post('/api/logout', async (req, res) => {
  await prisma.RefreshTokens.delete({
    where: {
      token: req.body.refreshToken
    }
  });

  res.status(204).json({
    message: 'Logged out'
  });
});

app.post('/api/group', authenticateToken, async (req, res) => {
  const { groupName, username } = req.body;

  if (!groupName || !username) return res.sendStatus(400);

  const userExists = await prisma.user.findUnique({
    where: {
      username
    }
  });

  await prisma.group.create({
    data: {
      name: groupName,
      groupAdmin: userExists.id
    }
  });

  res.sendStatus(201);
});
app.listen(3000, () => {
  console.log('Listening');
});
