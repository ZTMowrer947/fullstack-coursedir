import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/courses',
    element: <App />,
  },
  {
    path: '/',
    element: <Navigate to="/courses" />,
  },
]);

export default router;
