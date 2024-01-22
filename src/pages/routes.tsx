import { createBrowserRouter } from 'react-router-dom';
import Home from './home/page';
import Courses from './courses/page';
import CourseInfo from './courses/[id]/page';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/courses',
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
]);

export default routes;
