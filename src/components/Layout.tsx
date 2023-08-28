import { PropsWithChildren } from 'react';

import Header from './Header.tsx';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="mx-20">{children}</main>
    </>
  );
}
