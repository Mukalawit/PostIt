const { User } = require('../models');
const { prismaMock } = require('../db/singleton');

const record = {
  username: 'username',
  password: 'password',
  email: 'test@test.com'
};

const { username, email, password } = record;

const user = new User(username, email, password);

describe('When a user signs in', () => {
  it('should return user on signup', async () => {
    prismaMock.user.create.mockResolvedValue(record);

    await expect(user.save()).resolves.toEqual({
      username,
      password,
      email
    });
  });

  it('throw an error on duplicate email', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce({ email });

    await expect(user.save()).rejects.toThrow(
      'email is already in use'
    );
  });
});
