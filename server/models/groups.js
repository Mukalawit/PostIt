const { verifyAccessToken } = require('../utils/token-helpers');
const { HttpError } = require('../utils/errors');
const prisma = require('../db');

class Group {
  constructor(name, token) {
    this.name = name;
    this.token = token;
  }

  async groupByUserExists() {
    const { token, name } = this;
    const user = verifyAccessToken(token);

    if (!user) {
      throw new HttpError(401, 'Not Authorised');
    }
    const record = await prisma.Group.findUnique({
      where: {
        name
      }
    });

    if (record) {
      if (record.groupAdmin === user.id) {
        throw new HttpError(409, 'Group by user already exists');
      }
    }
  }

  async addGroup() {
    const { token, name } = this;
    const user = verifyAccessToken(token);

    await prisma.Group.create({
      data: {
        name,
        groupAdmin: user.id
      }
    });

    const group = await prisma.$queryRaw`SELECT "id" FROM "Group" WHERE "name" = ${name} AND "groupAdmin" = ${user.id}`;

    await prisma.GroupMembership.create({
      data: {
        group_id: group[0].id,
        user_id: user.id
      }
    });
  }

  async save() {
    await this.groupByUserExists();
    await this.addGroup();
  }
}
module.exports = Group;
