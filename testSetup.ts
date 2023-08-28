import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import server from './src/api-mock/server';
import db from './src/api-mock/db';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  db.close();
  server.close();
});
