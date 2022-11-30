/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended');

const prisma = require('./db');

const prismaMock = prisma;

jest.mock('./db', () => mockDeep());

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = { prismaMock };
