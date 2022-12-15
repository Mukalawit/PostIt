/* eslint-disable no-undef */
const request = require('supertest');
const { User } = require('../models');
const app = require('../server');
const { HttpError } = require('../utils/errors');

let token;

let server;

beforeAll(() => {
  server = app.listen(3001);
});

afterAll(() => {
  server.close();
});
const baseURL = 'http://localhost:3001';

describe('When a user refreshes a token', () => {
  it('should fail if no token exists', async () => {
    token = '';
    const response = await request(baseURL).post('/api/refresh-token').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(400);
  });

  it('should return correct status code on sucessful token refresh', async () => {
    token = 'token';
    jest.spyOn(User, 'refreshToken').mockImplementationOnce(() => Promise.resolve());
    const response = await request(baseURL).post('/api/refresh-token').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(201);
  });
  it('should return correct error status code if the token nolonger exists', async () => {
    token = 'token';
    jest.spyOn(User, 'refreshToken').mockImplementationOnce(() => Promise.reject(new HttpError(400, 'Bad request')));
    const response = await request(baseURL).post('/api/refresh-token').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(400);
  });
  it('should return  correct error status code on unexpected error', async () => {
    token = 'token';
    jest.spyOn(User, 'refreshToken').mockImplementationOnce(() => Promise.reject(new Error('Internal Error')));
    const response = await request(baseURL).post('/api/refresh-token').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(500);
  });
});
