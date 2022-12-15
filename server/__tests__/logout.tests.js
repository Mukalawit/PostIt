/* eslint-disable no-undef */
const request = require('supertest');
const { User } = require('../models');
const app = require('../server');

let server;
let token;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});
const baseURL = 'http://localhost:3001';

describe('When a user logs out', () => {
  it('should return correct status code when a user logs out', async () => {
    token = 'token';
    const response = await request(baseURL).post('/api/logout').set('Authorization', `Bearer ${token}`);
    jest.spyOn(User, 'logout').mockImplementationOnce(() => Promise.resolve());
    expect(response.statusCode).toBe(204);
  });
});
