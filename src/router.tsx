import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Layout from './components/Layout.tsx';
import CourseListing from './pages/CourseListing.tsx';
import { loader as courseLoader } from './queries/getCourses.ts';
import queryClient from './queryClient.ts';

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
        loader: courseLoader(queryClient),
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
