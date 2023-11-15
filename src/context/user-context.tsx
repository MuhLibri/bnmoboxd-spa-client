import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { User } from '@/utils/interfaces.ts';
import { getProfile } from '@/services/curator.ts';
import { useQuery } from '@tanstack/react-query';

interface UserContextValue {
  user: User | undefined;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User>();
  const { data, isLoading } = useQuery({ queryKey: ['profile'], queryFn: () => getProfile() });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(isLoading);
    if (!isLoading) {
      setUser(data);
    }
  }, [data, isLoading]);
  return <UserContext.Provider value={{ user, loading, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
