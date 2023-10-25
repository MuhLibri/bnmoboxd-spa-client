import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full">{children}</div>;
};

export default Layout;
