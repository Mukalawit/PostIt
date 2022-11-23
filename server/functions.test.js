const { createUser } = require('./functions');

const { prismaMock } = require('./singleton');

test('should create new user', async () => {
  const user = {
    id: 1,
    username: 'username',
    password: 'password',
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    username: 'username',
    password: 'password',
  });
});
