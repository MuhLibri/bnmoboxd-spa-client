import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/login.tsx';
import RegisterPage from '@/pages/register.tsx';
import { NotFound } from '@/pages/not-found.tsx';
import AdminDashboard from '@/pages/admin';
import { ProtectedRoute } from '@/components/protected-route.tsx';
import CuratorDashboard from '@/pages/curator';
import { Reviews } from '@/pages/curator/reviews.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster.tsx';
import { VerificationPage } from '@/pages/admin/verification.tsx';
import { SubscriptionPage } from '@/pages/admin/subscription.tsx';
import { ProfilePage } from '@/pages/curator/profile.tsx';
import { UserProvider } from '@/context/user-context.tsx';

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      element: <ProtectedRoute adminPage={<AdminDashboard />} curatorPage={<CuratorDashboard />} />,
    },
    {
      path: '/reviews',
      element: <ProtectedRoute curatorPage={<Reviews />} />,
    },
    {
      path: '/verifications',
      element: <ProtectedRoute adminPage={<VerificationPage />} />,
    },
    {
      path: '/subscriptions',
      element: <ProtectedRoute adminPage={<SubscriptionPage />} />,
    },
    {
      path: '/profile',
      element: <ProtectedRoute curatorPage={<ProfilePage />} />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
