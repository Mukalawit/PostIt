const bcrypt = require('bcrypt');
const prisma = require('../db');
const {
  generateRefreshToken, generateAccessToken, verifyRefreshToken
} = require('../utils/token-helpers');

const saltRounds = 10;

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async isUnique(property) {
    const record = await prisma.user.findUnique({
      where: property
    });

    if (record) {
      throw new HttpError(409, `${Object.keys(property)[0]} is already in use`);
    }
  }

  static async generatePassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  static async userExists(username) {
    const record = await prisma.user.findUnique({
      where: username
    });

    if (!record) {
      throw new HttpError(404, `${Object.keys(username)[0]} could not be found`);
    }
    return record;
  }

  static async comparePassword(username, password) {
    const record = await User.userExists({ username });
    const storedPassword = record.password;
    bcrypt.compare(password, storedPassword, async (err, result) => {
      if (!result) {
        throw new HttpError(401, 'Not Authorised');
      }
      if (err) {
        throw new HttpError(500, 'Internal server error');
      }
    });
  }

  static async login(username, password) {
    const record = await User.userExists({ username });
    await User.comparePassword(username, password);
    const accessToken = generateAccessToken(record);
    const refreshToken = generateRefreshToken(record);
    await prisma.RefreshTokens.create({
      data: {
        token: refreshToken
      }
    });
    return { accessToken, refreshToken };
  }
  async save() {
    const { email, password, username } = this;
    await User.isUnique({ email });
    await User.isUnique({ username });
    const hash = await User.generatePassword(password);

    return prisma.user.create({
      data: {
        username,
        password: hash,
        email,
      },
    });
  }
  static async refreshToken(rToken) {
    const token = await prisma.RefreshTokens.findUnique({
      where: rToken
    });

    if (!token) {
      throw new HttpError(400, 'Bad request');
    }
    const record = verifyRefreshToken(rToken);
    await prisma.RefreshTokens.delete({
      where: rToken
    });

    const accessToken = generateAccessToken(record);
    const refreshToken = generateRefreshToken(record);

    await prisma.RefreshTokens.create({
      data: {
        token: refreshToken
      }
    });

    return { accessToken, refreshToken };
  }
}

module.exports = User;
