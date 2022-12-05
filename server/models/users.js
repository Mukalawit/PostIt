const bcrypt = require('bcrypt');
const prisma = require('../db');
const HttpError = require('../utils');

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
}

module.exports = User;
