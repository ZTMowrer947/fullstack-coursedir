import { setupWorker } from 'msw';

import handlers from './handlers.ts';

const worker = setupWorker(...handlers);

export default worker;
