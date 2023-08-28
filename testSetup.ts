import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import db from './src/api-mock/db';
import server from './src/api-mock/server';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  db.close();
  server.close();
});
