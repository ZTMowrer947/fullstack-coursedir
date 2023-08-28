import { setupServer } from 'msw/node';

import handlers from './handlers.ts';

const server = setupServer(...handlers);

export default server;
