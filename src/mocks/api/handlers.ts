import { RequestHandler } from 'msw';

import courseHandlers from './course';
import userHandlers from './user';

const handlers: RequestHandler[] = [...courseHandlers, ...userHandlers];

export default handlers;
