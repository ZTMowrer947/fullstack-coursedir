import handlers from './handlers.ts';
import { setupWorker } from 'msw';

const worker = setupWorker(...handlers);

export default worker;
