const { HttpError } = require('../utils/errors');
const prisma = require('../db');

class Group {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  async isDuplicate() {
    const { id, name } = this;
    const record = await prisma.Group.findUnique({
      where: {
        name
      }
    });

    if (record) {
      if (record.groupAdmin === id) {
        throw new HttpError(409, 'Group by user already exists');
      }
    }
  }

  async createGroup() {
    const { id, name } = this;

    await prisma.Group.create({
      data: {
        name,
        groupAdmin: id
      }
    });

    const group = await prisma.$queryRaw`SELECT "id" FROM "Group" WHERE "name" = ${name} AND "groupAdmin" = ${id}`;

    await prisma.GroupMembership.create({
      data: {
        group_id: group[0].id,
        user_id: id
      }
    });
  }

  async save() {
    await this.isDuplicate();
    await this.createGroup();
  }
}
module.exports = Group;
