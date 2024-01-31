import { PropsWithChildren } from 'react';
import Header from './header';

export type LayoutProps = PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div id="content">{children}</div>
    </>
  );
}
