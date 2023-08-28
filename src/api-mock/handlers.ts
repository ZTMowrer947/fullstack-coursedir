import { RequestHandler } from 'msw';

const handlerFiles = import.meta.glob('./handlers/*.ts');

const handlers = (
  await Promise.all(
    Object.values(handlerFiles).flatMap(async (mod) => {
      const modHandlers = (await mod()) as Record<string, RequestHandler>;

      return Object.values(modHandlers);
    }),
  )
).flat();

export default handlers;
