import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import Layout from './components/Layout.tsx';
import CourseDetail from './pages/CourseDetail.tsx';
import CourseListing from './pages/CourseListing.tsx';
import SignIn from './pages/SignIn.tsx';
import { loader as coursesLoader } from './queries/getCourses.ts';
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
        element: <CourseListing />,
        loader: coursesLoader(queryClient),
      },
      {
        path: '/courses/:id',
        element: <CourseDetail />,
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
