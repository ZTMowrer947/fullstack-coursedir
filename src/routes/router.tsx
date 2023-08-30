import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import queryClient from '@/queryClient.ts';
import Layout from '@/routes/layout.tsx';

import courseLoader from './courses/:id/loader.ts';
import CourseDetail from './courses/:id/route.tsx';
import coursesLoader from './courses/loader.ts';
import CourseListing from './courses/route.tsx';
import SignIn from './signin/route.tsx';

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/courses',
        children: [
          {
            path: ':id',
            element: <CourseDetail />,
            loader: courseLoader(queryClient),
          },
          {
            index: true,
            element: <CourseListing />,
            loader: coursesLoader(queryClient),
          },
        ],
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
