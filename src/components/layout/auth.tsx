import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative h-screen w-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.png" alt="logo" className="w-[150px]" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;BNMOBOXD Curator Account is built for Curators to manage and add their reviews.&rdquo;</p>
            <footer className="text-sm">Built with ❤️ by Group 16</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 h-full">{children}</div>
    </div>
  );
};
export default AuthLayout;
