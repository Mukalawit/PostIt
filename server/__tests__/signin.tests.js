/* eslint-disable no-undef */
const request = require('supertest');
const { User } = require('../models');

const app = require('../server');
const { HttpError } = require('../utils/errors');

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});
const record = {
  username: 'username',
  password: 'password',
};

const { username, password } = record;

const baseURL = 'http://localhost:3001';

describe('When a user signs in', () => {
  it('should fail if no username is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signin').send({ username });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });

  it('should fail if no password is submitted', async () => {
    const response = await request(baseURL).post('/api/user/signin').send({ password });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });
  it('should return correct status code on successful sign in', async () => {
    jest.spyOn(User, 'login').mockImplementationOnce(() => Promise.resolve());

    const response = await request(baseURL).post('/api/user/signin').send({ username, password });
    expect(response.statusCode).toBe(200);
  });
  it('should return correct status code on submission of incorrect password', async () => {
    jest.spyOn(User, 'login').mockImplementationOnce(() => Promise.reject(new HttpError(401, 'Not Authorised')));

    const response = await request(baseURL).post('/api/user/signin').send({ username, password });
    expect(response.statusCode).toBe(401);
  });
  it('should return correct status code on unexpected error', async () => {
    jest.spyOn(User, 'login').mockImplementationOnce(() => Promise.reject(new Error('Internal error')));

    const response = await request(baseURL).post('/api/user/signin').send({ username, password });
    expect(response.statusCode).toBe(500);
  });
  it('should return correct status code if username does not exist', async () => {
    jest.spyOn(User, 'login').mockImplementationOnce(() => Promise.reject(new HttpError(404, 'username does not exist')));

    const response = await request(baseURL).post('/api/user/signin').send({ username, password });
    expect(response.statusCode).toBe(404);
  });
});
