import { ReactNode } from 'react';
import { Card } from '@/components/ui/card.tsx';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:grid lg:grid-cols-6 w-full min-h-screen border-box">
      <Card className="p-8 space-y-8">
        <img src="public/logo.png" alt="logo" className="mx-auto w-[150px]" />
      </Card>
      <div className="lg:col-span-5 px-8 py-12 md:p-20 lg:py-20 space-y-4">{children}</div>
    </div>
  );
};

export default Layout;
