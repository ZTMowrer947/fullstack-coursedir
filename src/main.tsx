import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize mock service worker in dev environment
if (import.meta.env.DEV) {
  const { default: worker } = await import('./api-mock/browser.ts');

  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
