import { api } from '@/utils/api.ts';
import { BaseResponse, User } from '@/utils/interfaces.ts';
import { setToken } from '@/utils/token-storage.ts';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  firstName: string;
  lastName?: string;
  email: string;
}

interface AuthResponse extends BaseResponse {
  data: {
    auth: {
      user: User;
      access_token: string;
    };
  };
}

export const login = async (payload: LoginPayload): Promise<User> => {
  const response = await api.post('/auth/login', payload);
  const res = response.data as AuthResponse;
  setToken(res.data.auth.access_token);
  return res.data.auth.user;
};

export const register = async (payload: RegisterPayload) => {
  await api.post('/auth/register', payload);
};
