import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Layout from '@/components/Layout.tsx';
import CourseDetail from '@/routes/courses/:id/route.tsx';
import coursesLoader from '@/routes/courses/loader.ts';
import CourseListing from '@/routes/courses/route.tsx';
import SignIn from '@/routes/signin/route.tsx';

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
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/courses',
        children: [
          {
            path: ':id',
            element: <CourseDetail />,
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
