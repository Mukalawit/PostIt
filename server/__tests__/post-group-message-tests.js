/* eslint-disable no-undef */
const request = require('supertest');
const { Message } = require('../models');

const app = require('../server');
const { HttpError } = require('../utils/errors');

let server;
jest.mock('../models', () => ({
  Message: jest.fn()
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
  userMessage: 'This is a test'
};

const { userMessage } = record;

const token = 'token';

const baseURL = 'http://localhost:3001';

describe('When a user posts a message to a group', () => {
  it('should return correct status code if the message is not submitted', async () => {
    const response = await request(baseURL).post('/api/group/:id/message').set('Authorization', `Bearer ${token}`).send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Payload');
  });

  it('should return correct status code if the message has been submitted', async () => {
    Message.mockImplementationOnce(() => ({
      add: jest.fn(() => Promise.resolve()),
    }));
    const response = await request(baseURL).post('/api/group/:id/message').set('Authorization', `Bearer ${token}`).send({ userMessage });
    expect(response.statusCode).toBe(201);
  });
  it('should return correct status code if the user is not authorized to post in the group', async () => {
    Message.mockImplementationOnce(() => ({
      add: jest.fn(() => Promise.reject(new HttpError(403, 'You do not belong to this group, cannot post here!'))),
    }));
    const response = await request(baseURL).post('/api/group/:id/message').set('Authorization', `Bearer ${token}`).send({ userMessage });
    expect(response.statusCode).toBe(403);
  });
  it('should return correct status code on an unexpected error', async () => {
    Message.mockImplementationOnce(() => ({
      add: jest.fn(() => Promise.reject(new Error(500, 'Interval server'))),
    }));
    const response = await request(baseURL).post('/api/group/:id/message').set('Authorization', `Bearer ${token}`).send({ userMessage });
    expect(response.statusCode).toBe(500);
  });
});
