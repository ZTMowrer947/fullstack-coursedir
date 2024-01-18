import { createBrowserRouter } from 'react-router-dom';
import Home from './home/page';
import Courses from './courses/page';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/courses',
    element: <Courses />,
  },
]);

export default routes;
