import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

import { authActionWrapper, authLoaderWrapper } from '@/pages/(auth)/auth-wrappers.ts';
import guestLoader from '@/pages/(auth)/guest-loader.ts';
import signOutAction from '@/pages/(auth)/signout/action.ts';
import courseDeleteAction from '@/pages/courses/[id]/delete/action.ts';
import ConfirmDelete from '@/pages/courses/[id]/delete/page.tsx';
import courseUpdateDeleteLoader from '@/pages/courses/[id]/updel-loader.ts';
import newCourseAction from '@/pages/courses/new/action.ts';
import NewCoursePage from '@/pages/courses/new/page.tsx';
import userLoader from '@/pages/user-loader.ts';

import queryClient from '../queryClient';
import signInAction from './(auth)/signin/action';
import SigninPage from './(auth)/signin/page';
import signUpAction from './(auth)/signup/action';
import SignupPage from './(auth)/signup/page';
import Layout from './(base)/layout';
import courseDetailLoader from './courses/[id]/loader.tsx';
import CourseInfo from './courses/[id]/page';
import courseListLoader from './courses/loader';
import Courses from './courses/page';

export function initRoutes() {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      id: 'base',
      loader: userLoader(queryClient),
      children: [
        {
          index: true,
          element: <Courses />,
          loader: courseListLoader(queryClient),
        },
        {
          path: 'signin',
          element: <SigninPage />,
          loader: guestLoader,
          action: signInAction(queryClient),
        },
        {
          path: 'signout',
          action: signOutAction(queryClient),
          loader() {
            return redirect('/courses');
          },
          element: <></>,
        },
        {
          path: 'signup',
          element: <SignupPage />,
          loader: guestLoader,
          action: signUpAction(queryClient),
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
              path: 'new',
              element: <NewCoursePage />,
              loader: authLoaderWrapper(queryClient, () => () => null),
              action: authActionWrapper(queryClient, newCourseAction),
            },
            {
              path: ':id',
              children: [
                {
                  index: true,
                  element: <CourseInfo />,
                  loader: courseDetailLoader(queryClient),
                },
                {
                  path: 'delete',
                  element: <ConfirmDelete />,
                  loader: authLoaderWrapper(queryClient, courseUpdateDeleteLoader),
                  action: authActionWrapper(queryClient, courseDeleteAction),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}

export default initRoutes;
