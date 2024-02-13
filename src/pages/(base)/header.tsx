import { Suspense } from 'react';
import { Await, NavLink, useRouteLoaderData } from 'react-router-dom';

import { AuthLoaderData } from '@/pages/(auth)/loader.ts';

export default function Header() {
  const data = useRouteLoaderData('base') as AuthLoaderData;

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
                <form method="POST">
                  <input type="hidden" name="op" value="signout" />
                  <span>
                    Welcome {user.firstName} {user.lastName}!
                  </span>
                  <button type="submit">Log Out</button>
                </form>
              );
            }}
          </Await>
        </Suspense>
      </nav>
    </header>
  );
}
