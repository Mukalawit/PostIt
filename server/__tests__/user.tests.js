/* eslint-disable no-undef */
const { User } = require('../models');
const { prismaMock } = require('../db/singleton');
const { HttpError } = require('../utils/errors');

const record = {
  username: 'username',
  password: 'password',
  email: 'test@test.com'
};

jest.mock('../utils/token-helpers', () => ({
  generateAccessToken: jest.fn().mockImplementation(() => 'accessToken'),
  generateRefreshToken: jest.fn().mockImplementation(() => 'refreshToken'),
  verifyRefreshToken: jest.fn().mockImplementation(() => 'record')
}));
const { username, email, password } = record;

const user = new User(username, email, password);

describe('When a user signs up', () => {
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

describe('When user signs in', () => {
  it('should return token when a user signs in', async () => {
    jest.spyOn(User, 'userExists').mockImplementationOnce(() => Promise.resolve(record));
    jest.spyOn(User, 'comparePassword').mockImplementationOnce(() => Promise.resolve());
    prismaMock.RefreshTokens.create.mockResolvedValueOnce();
    await expect(User.login(username, password)).resolves.toEqual({ accessToken: 'accessToken', refreshToken: 'refreshToken' });
  });
  it('throw an error if the password is incorrect', async () => {
    jest.spyOn(User, 'userExists').mockImplementationOnce(() => Promise.resolve(record));
    jest.spyOn(User, 'comparePassword').mockImplementationOnce(() => Promise.reject(new HttpError(401, 'Not Authorised')));
    prismaMock.RefreshTokens.create.mockResolvedValueOnce();
    await expect(User.login(username, password)).rejects.toThrow('Not Authorised');
  });
  it('throw an error if the username does not exist', async () => {
    jest.spyOn(User, 'userExists').mockImplementationOnce(() => Promise.reject(new HttpError(404, 'username could not be found')));
    jest.spyOn(User, 'comparePassword').mockImplementationOnce(() => Promise.resolve());
    prismaMock.RefreshTokens.create.mockResolvedValueOnce();
    await expect(User.login(username, password)).rejects.toThrow('username could not be found');
  });
  it('should return token when a user refreshes token', async () => {
    const token = 'token';
    prismaMock.RefreshTokens.findUnique.mockResolvedValueOnce(token);
    prismaMock.RefreshTokens.delete.mockResolvedValueOnce();
    prismaMock.RefreshTokens.create.mockResolvedValueOnce();
    await expect(User.refreshToken({ token })).resolves.toEqual({ accessToken: 'accessToken', refreshToken: 'refreshToken' });
  });
});
