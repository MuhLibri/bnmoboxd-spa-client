import { ReactElement } from 'react';
import { useUser } from '@/context/user-context.tsx';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ adminPage, curatorPage }: { adminPage?: ReactElement; curatorPage?: ReactElement }) => {
  const { user, loading } = useUser();
  if (!loading) {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.isAdmin && adminPage) {
      return adminPage;
    }
    if (!user.isAdmin && curatorPage) {
      return curatorPage;
    }
    return <Navigate to="/" />;
  }
};
