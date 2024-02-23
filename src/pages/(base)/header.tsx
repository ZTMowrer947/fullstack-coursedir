import { Suspense } from 'react';
import { Await, NavLink, useFetcher, useRouteLoaderData } from 'react-router-dom';

import { AuthLoaderData } from '@/pages/user-loader.ts';

export default function Header() {
  const data = useRouteLoaderData('base') as AuthLoaderData;
  const signoutFetcher = useFetcher();

  return (
    <header>
      <nav>
        <Suspense fallback={<></>}>
          <Await resolve={data.user}>
            {(user: Awaited<AuthLoaderData['user']>) => {
              // Show signin and signup links for guest
              if (!user) {
                return (
                  <>
                    <NavLink to="/signin">Sign In</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                  </>
                );
              }

              // Display welcome and signout button for authenticated user
              return (
                <signoutFetcher.Form method="POST" action="/signout">
                  <span>
                    Welcome {user.firstName} {user.lastName}!
                  </span>
                  <button type="submit">Sign Out</button>
                </signoutFetcher.Form>
              );
            }}
          </Await>
        </Suspense>
      </nav>
    </header>
  );
}
