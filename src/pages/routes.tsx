import { Outlet, createBrowserRouter } from 'react-router-dom';
import Courses from './courses/page';
import CourseInfo from './courses/[id]/page';
import Layout from './(base)/layout';

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
      },
      {
        path: 'courses',
        children: [
          {
            index: true,
            element: <Courses />,
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
