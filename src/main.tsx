import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

// Initialize mock service worker in dev environment
if (import.meta.env.DEV) {
  const { default: worker } = await import('./api-mock/browser.ts');

  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
