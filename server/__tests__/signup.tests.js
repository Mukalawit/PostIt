const request = require('supertest');
const { User } = require('../models');
const { prismaMock } = require('../db/singleton');

const record = {
  username: 'username',
  password: 'password',
  email: 'test@test.com'
};

const { username, email, password } = record;

const user = new User(username, email, password);

const baseURL = 'http://localhost:3000';

describe('When a user signs up', () => {

  it('should fail if no username is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      email: 'testing@test.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });

  it('should fail if no email is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      username: 'username',
      password: 'password',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });
  it('should fail if no username is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      email: 'testing@test.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });


  it('throws an error if email is already in use', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ email });

    await expect(User.isUnique({ email })).rejects.toThrow('email is already in use');

  });

  it('throws an error if username is already in use', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ username });

    await expect(User.isUnique({ username })).rejects.toThrow('username is already in use');
  });

  it('should return user on signup', async () => {
    prismaMock.user.create.mockResolvedValue(record);

    await expect(user.save()).resolves.toEqual({
      username: 'username',
      password: 'password',
      email: 'test@test.com'
    });
  });
});
