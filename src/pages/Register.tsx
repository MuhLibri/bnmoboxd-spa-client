import AuthLayout from '@/components/layout/auth.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { buttonVariants } from '@/components/ui/button.tsx';
import { RegisterForm } from '@/components/auth/RegisterForm.tsx';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Link to="/login" className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}>
        Login
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center h-full items-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
          <p className="text-sm text-muted-foreground">Create a new Curator account</p>
        </div>
        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
