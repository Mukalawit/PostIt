const request = require('supertest');
const { User } = require('../models');
const app = require('../server');
const HttpError = require('../utils');

const baseURL = 'http://localhost:3001';
jest.mock('../models', () => ({
  User: jest.fn()
}));
let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

const record = {
  username: 'username',
  email: 'testing@test.com',
  password: 'password'
};

const { username, email, password } = record;
describe('When a user signs up', () => {
  it('should fail if no username is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      email,
      password,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });

  it('should fail if no email is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      username,
      password,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });
  it('should fail if no username is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      email,
      password,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });
  it('should add a new user', async () => {
    User.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.resolve()),
    }));
    const response = await request(baseURL).post('/api/user/signup').send({
      username,
      email,
      password,
    });
    expect(response.statusCode).toBe(201);
  });

  it('should not add duplicate users', async () => { 
    User.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.reject(new HttpError(409,'user already exists'))),
    }));
    const response = await request(baseURL).post('/api/user/signup').send({
      username,
      email,
      password,
    });
    expect(response.statusCode).toBe(409);
  });
});
