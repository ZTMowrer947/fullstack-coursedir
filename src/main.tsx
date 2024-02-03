import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

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

// Import route information (must do this after MSW setup to ensure loaders work correctly in dev)
const { default: routes } = await import('./pages/routes.tsx');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={routes} />
    </App>
  </React.StrictMode>,
);
