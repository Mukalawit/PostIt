/* eslint-disable no-undef */
const { Message } = require('../models');
const { HttpError } = require('../utils/errors');
const { prismaMock } = require('../db/singleton');

const record = {
    user_id: 3,
    msg: 'This is a test',
    createdAt: '2023-01-10 12:07:47.439'
};
const groupId = 1;
const userId = 1;
const { msg } = record;
const message = new Message(userId,groupId,msg);
describe('When a user posts a message to a group', () => {
    it('it should throw an error if the user is not authorized to post to the group', async () => {
        jest
            .spyOn(message, 'isGroupUser')
            .mockImplementationOnce(() => Promise.reject(new HttpError(403, 'You do not belong to this group, cannot post here!')));
        await expect(message.add()).rejects.toThrow('You do not belong to this group, cannot post here!');
    });
});
describe('When a user views messages in a group', () => {
    it('it should return a record of messages posted in the group', async () => {
        jest
            .spyOn(message, 'isGroupUser')
            .mockImplementationOnce(() => Promise.resolve());
        prismaMock.$queryRaw.mockResolvedValue(record);
        await expect(message.view()).resolves.toEqual(record);
    });
});

