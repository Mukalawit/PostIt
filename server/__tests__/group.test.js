/* eslint-disable no-undef */
const { Group } = require('../models');
const { HttpError } = require('../utils/errors');

const record = {
    name: 'The cool guys',
};
const data = [{ user_id: 345 }, { user_id: 543 }];
const groupId = 1;
const userId = 1;
const { name } = record;
const token = 'token';
const group = new Group(name, token);
describe('When a user adds a group', () => {
    it('it should throw an error if the group already exists', async () => {
        jest
            .spyOn(group, 'isDuplicate')
            .mockImplementationOnce(() => Promise.reject(new HttpError(409, 'Group by user already exists')));
        await expect(group.save()).rejects.toThrow('Group by user already exists');
    });
});

describe('When a user adds users to a group', () => {
    it('it should throw an error if the user is not authorized to add users to a group', async () => {
        jest
            .spyOn(Group, 'isGroupAdmin')
            .mockImplementationOnce(() => Promise.reject(new HttpError(403, 'Only the Group administrator can add users')));
        await expect(Group.addUsers(data, groupId, userId)).rejects.toThrow('Only the Group administrator can add users');
    });
});
