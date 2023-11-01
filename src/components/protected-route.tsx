import { ReactElement } from 'react';
import { getToken, setToken } from '@/utils/token-storage.ts';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@/utils/interfaces.ts';

export const ProtectedRoute = ({ adminPage, curatorPage }: { adminPage?: ReactElement; curatorPage?: ReactElement }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/login" />;
  }
  try {
    const { exp, user } = jwtDecode<Token>(token);
    if (Date.now() > parseInt(exp) * 1000) {
      return <Navigate to="/login" />;
    }
    if (user.isAdmin && adminPage) {
      return adminPage;
    }
    if (!user.isAdmin && curatorPage) {
      return curatorPage;
    }
    return <Navigate to="/" />;
  } catch (e) {
    setToken(null);
    return <Navigate to="/login" />;
  }
};
