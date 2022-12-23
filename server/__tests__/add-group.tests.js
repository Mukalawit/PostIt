/* eslint-disable no-undef */
const request = require('supertest');
const { Group } = require('../models');

const app = require('../server');
const { HttpError } = require('../utils/errors');

let server;
jest.mock('../models', () => ({
  Group: jest.fn()
}));
jest.mock('../utils/token-helpers', () => ({
  authenticateToken: jest.fn().mockImplementation((req, res, next) => {
    const user = {
      id: '1'
    };
    req.user = user;
    next();
  }),
}));
beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});

const record = {
  name: 'The cool boys'
};

const { name } = record;

const token = 'token';

const baseURL = 'http://localhost:3001';

describe('When a user adds a group', () => {
  it('should return correct status code if the group name is not submitted', async () => {
    const response = await request(baseURL).post('/api/group').set('Authorization', `Bearer ${token}`).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });

  it('should return correct status code if the group name has been submitted', async () => {
    Group.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.resolve()),
    }));
    const response = await request(baseURL).post('/api/group').set('Authorization', `Bearer ${token}`).send({ name });
    expect(response.statusCode).toBe(201);
  });
  it('should return correct status code if the user is not authorized', async () => {
    Group.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.reject(new HttpError(401, 'Not Authorized'))),
    }));
    const response = await request(baseURL).post('/api/group').set('Authorization', `Bearer ${token}`).send({ name });
    expect(response.statusCode).toBe(401);
  });
  it('should return correct status code if the group name has been submitted already exists', async () => {
    Group.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.reject(new HttpError(409, 'Group already exists'))),
    }));
    const response = await request(baseURL).post('/api/group').set('Authorization', `Bearer ${token}`).send({ name });
    expect(response.statusCode).toBe(409);
  });

  it('should return correct status code on an unexpected error', async () => {
    Group.mockImplementationOnce(() => ({
      save: jest.fn(() => Promise.reject(new Error(500, 'Interval server'))),
    }));
    const response = await request(baseURL).post('/api/group').set('Authorization', `Bearer ${token}`).send({ name });
    expect(response.statusCode).toBe(500);
  });
});
