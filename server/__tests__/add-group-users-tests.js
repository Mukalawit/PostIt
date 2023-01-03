/* eslint-disable no-undef */
const request = require('supertest');
const { Group } = require('../models');

const app = require('../server');
const { HttpError } = require('../utils/errors');

let server;

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

const data = [{ user_id: 345 }, { user_id: 543 }];
const token = 'token';

const baseURL = 'http://localhost:3001';

describe('When a user adds group users', () => {
    it('should return correct status code if the users data is not submitted', async () => {
        const response = await request(baseURL).post('/api/group/:id/user').set('Authorization', `Bearer ${token}`).send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid Payload');
    });

    it('should return correct status code if the users data has been submitted', async () => {
        jest.spyOn(Group, 'addUsers').mockImplementationOnce(() => Promise.resolve());
        const response = await request(baseURL).post('/api/group/:id/user').set('Authorization', `Bearer ${token}`).send({ data });
        expect(response.statusCode).toBe(201);
    });
    it('should return correct status code if the user is not authorized to add users to group', async () => {
        jest.spyOn(Group, 'addUsers').mockImplementationOnce(() => Promise.reject(new HttpError(403, 'Only the Group administrator can add users')));
        const response = await request(baseURL).post('/api/group/:id/user').set('Authorization', `Bearer ${token}`).send({ data });
        expect(response.statusCode).toBe(403);
    });

    it('should return correct status code on an unexpected error', async () => {
        jest.spyOn(Group, 'addUsers').mockImplementationOnce(() => Promise.reject(new Error(500, 'Internal Server Error')));
        const response = await request(baseURL).post('/api/group/:id/user').set('Authorization', `Bearer ${token}`).send({ data });
        expect(response.statusCode).toBe(500);
    });
});
