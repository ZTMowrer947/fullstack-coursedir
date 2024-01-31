import { Outlet, createBrowserRouter } from 'react-router-dom';
import Courses from './courses/page';
import CourseInfo from './courses/[id]/page';
import Layout from './(base)/layout';
import courseListLoader from './courses/loader';
import queryClient from '../queryClient';

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
          },
        ],
      },
    ],
  },
]);

export default routes;
