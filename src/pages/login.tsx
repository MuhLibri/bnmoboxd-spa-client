import AuthLayout from '@/components/layout/auth.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { buttonVariants } from '@/components/ui/button.tsx';
import { LoginForm } from '@/components/auth/login-form.tsx';

const LoginPage = () => {
  return (
    <AuthLayout>
      <Link to="/register" className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
        Register
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center h-full items-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">Login to your Curator Account</p>
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
