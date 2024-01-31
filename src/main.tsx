import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider } from 'react-router-dom';

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

const { default: routes } = await import('./pages/routes.tsx');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={routes} />
    </App>
  </React.StrictMode>,
);
