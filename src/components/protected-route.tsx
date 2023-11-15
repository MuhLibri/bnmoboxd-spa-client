import { ReactElement } from 'react';
import { getToken, setToken } from '@/utils/token-storage.ts';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@/utils/interfaces.ts';

export const ProtectedRoute = ({ adminPage, curatorPage }: { adminPage?: ReactElement; curatorPage?: ReactElement }) => {
  const token = getToken();
  console.log('hahhhh');
  if (!token) {
    console.log('masuk sinii kah');
    return <Navigate to="/login" />;
  }
  try {
    const { user } = jwtDecode<Token>(token);
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
