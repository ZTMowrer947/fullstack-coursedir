import { Outlet, createBrowserRouter } from 'react-router-dom';
import Courses from './courses/page';
import CourseInfo from './courses/[id]/page';
import Layout from './(base)/layout';
import courseListLoader from './courses/loader';
import queryClient from '../queryClient';
import courseDetailLoader from './courses/[id]/loader';
import SignupPage from './(auth)/signup/page';
import SigninPage from './(auth)/signin/page';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Courses />,
        loader: courseListLoader(queryClient),
      },
      {
        path: 'signin',
        element: <SigninPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'courses',
        children: [
          {
            index: true,
            element: <Courses />,
            loader: courseListLoader(queryClient),
          },
          {
            path: ':id',
            element: <CourseInfo />,
            loader: courseDetailLoader(queryClient),
          },
        ],
      },
    ],
  },
]);

export default routes;
