const request = require('supertest');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@localhost:5432/tests?schema=public',
    },
  },
});

const baseURL = 'http://localhost:3000';

describe('When a user signs up', () => {
  beforeEach(async ()=>{
    await prisma.user.deleteMany({});
  });

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

  it('should add a new user', async () => {
    const response = await request(baseURL).post('/api/user/signup').send({
      username: 'username',
      email: 'testing@test.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(201);
  });

  it('should not add duplicate users', async () => {
    const response1 = await request(baseURL).post('/api/user/signup').send({
      username: 'username',
      email: 'testing@test.com',
      password: 'password',
    });

    const response2 = await request(baseURL).post('/api/user/signup').send({
      username: 'username',
      email: 'testing@test.com',
      password: 'password',
    });

    expect(response2.statusCode).toBe(409);
  });
});
