import { createBrowserRouter } from 'react-router-dom';
import Home from './home/page';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default routes;
