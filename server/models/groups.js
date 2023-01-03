/* eslint-disable no-restricted-syntax */
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
                name,
            },
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
                groupAdmin: id,
            },
        });

        const group = await prisma.$queryRaw`SELECT "id" FROM "Group" WHERE "name" = ${name} AND "groupAdmin" = ${id}`;

        await prisma.GroupMembership.create({
            data: {
                group_id: group[0].id,
                user_id: id,
            },
        });
    }

    static async isGroupAdmin(groupId, userId) {
        const record = await prisma.Group.findUnique({
            where: {
                id: Number(groupId),
            },
        });
        if (record.groupAdmin !== userId) {
            throw new HttpError(403, 'Only the Group administrator can add users');
        }
    }
    
    static async sanitizeData(arr, groupId) {
        const results = [];

        for (const obj of arr) {
            const result = prisma.$queryRaw`SELECT user_id FROM "GroupMembership" WHERE "group_id" = ${Number(groupId)} AND "user_id" = ${obj.user_id}`;
            results.push(result);
        }
        const awaitedResults = await Promise.all(results);
        const filteredAwaitedResults = awaitedResults.filter(obj => obj.length > 0);
        
        const result = arr.filter(element => {
          return filteredAwaitedResults.every(obj=> obj[0].user_id !== element.user_id);
        });
        return result;
      
    }

    static async addUsers(arr, groupId, userId) {
        await Group.isGroupAdmin(groupId, userId);
        const newUsers = await Group.sanitizeData(arr, groupId);

        if (newUsers.length === 0) {
            throw new HttpError(409, 'All the users submitted already exist in the group');
        }
        newUsers.forEach((object) => {
            object.group_id = Number(groupId);
        });
        await prisma.GroupMembership.createMany({
            data: newUsers
        });
    }

    async save() {
        await this.isDuplicate();
        await this.createGroup();
    }
}
module.exports = Group;
