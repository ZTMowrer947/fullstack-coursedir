import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import CourseListing from './pages/CourseListing.tsx';

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
        element: <CourseListing />,
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
