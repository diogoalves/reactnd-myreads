import fetchMock from 'jest-fetch-mock';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;
global.fetch = fetchMock;
