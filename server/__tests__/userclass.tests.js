const { User } = require('../models');
const { prismaMock } = require('../singleton');

describe('Unit test for user class', () => {
  it('Should signup a new user', async () => {
    const record = {
      username: 'username',
      password: 'password',
      email: 'test@test.com'
    };

    const { username, email, password } = record;

    const user = new User(username, email, password);

    prismaMock.user.create.mockResolvedValue(record);

    await expect(user.save()).resolves.toEqual({
      username: 'username',
      password: 'password',
      email: 'test@test.com'
    });
  });
});
