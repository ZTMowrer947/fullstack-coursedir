import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './App.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '/courses',
        element: <App />,
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
