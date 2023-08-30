import { PropsWithChildren } from 'react';

import Header from '@/components/Header.tsx';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="mx-20">{children}</main>
    </>
  );
}
