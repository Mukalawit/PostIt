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

const token = 'token';

const baseURL = 'http://localhost:3001';

describe('When a user views messages in a group', () => {
  it('should return correct status code if the user is viewing messages', async () => {
    Message.mockImplementationOnce(() => ({
      view: jest.fn(() => Promise.resolve()),
    }));
    const response = await request(baseURL).get('/api/group/:id/messages').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
  it('should return correct status code if the user is not authorized to view messages in the group', async () => {
    Message.mockImplementationOnce(() => ({
      view: jest.fn(() => Promise.reject(new HttpError(403, 'You do not belong to this group'))),
    }));
    const response = await request(baseURL).get('/api/group/:id/messages').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(403);
  });
  it('should return correct status code on an unexpected error', async () => {
    Message.mockImplementationOnce(() => ({
      view: jest.fn(() => Promise.reject(new Error(500, 'Interval server'))),
    }));
    const response = await request(baseURL).get('/api/group/:id/messages').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(500);
  });
});
