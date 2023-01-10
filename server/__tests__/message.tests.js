/* eslint-disable no-undef */
const { Message } = require('../models');
const { HttpError } = require('../utils/errors');

const record = {
    msg: 'This is a test',
};
const groupId = 1;
const userId = 1;
const { msg } = record;
const message = new Message(userId,msg,groupId);
describe('When a user posts a message to a group', () => {
    it('it should throw an error if the user is not authorized to post to the group', async () => {
        jest
            .spyOn(message, 'isGroupUser')
            .mockImplementationOnce(() => Promise.reject(new HttpError(403, 'You do not belong to this group, cannot post here!')));
        await expect(message.add()).rejects.toThrow('You do not belong to this group, cannot post here!');
    });
});

