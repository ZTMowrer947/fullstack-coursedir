import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import initRoutes from '@/pages/routes.tsx';

import App from './App.tsx';

// Initialize mock worker for development
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/api/browser.ts');

  await worker.start();

  // Seed mock database if needed
  const { default: mockDb, seedDb } = await import('./mocks/api/db.ts');

  if (mockDb.course.count() === 0 && mockDb.user.count() === 0) {
    seedDb();
  }
}

// Initialize routes
const routes = initRoutes();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <RouterProvider router={routes} />
    </App>
  </StrictMode>,
);
