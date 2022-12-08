/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended');

const prisma = require('./index');

const prismaMock = prisma;

jest.mock('./index', () => mockDeep());

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = { prismaMock };
