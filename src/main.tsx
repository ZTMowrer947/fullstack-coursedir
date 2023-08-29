import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

async function prepare() {
  // Initialize mock service worker in dev environment
  if (import.meta.env.DEV) {
    await import('../public/mockServiceWorker.js?worker');

    const { default: worker } = await import('./api-mock/browser.ts');

    return worker.start();
  }

  return Promise.resolve();
}

await prepare();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
