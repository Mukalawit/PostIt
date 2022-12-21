/* eslint-disable no-undef */
const { Group } = require('../models');
const { HttpError } = require('../utils/errors');

const record = {
  name: 'The cool guys',
};

const { name } = record;
const token = 'token';
const group = new Group(name, token);
describe('When a user adds a group', () => {
  it('it should throw an error if the group already exists', async () => {
    jest.spyOn(group, 'groupByUserExists').mockImplementationOnce(() => Promise.reject(new HttpError(409, 'Group by user already exists')));
    await expect(group.save()).rejects.toThrow('Group by user already exists');
  });
});
