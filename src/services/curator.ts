import { api } from '@/utils/api.ts';
import { User } from '@/utils/interfaces.ts';

const path = '/curator';
export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  bio: string;
}

interface ProfileResponse {
  data: User;
}
export const uploadProfileImage = async (payload: FormData) => {
  await api.post(`${path}/upload`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProfile = async () => {
  const res = (await api.get(`${path}/profile`)).data as ProfileResponse;
  return res.data;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  await api.put(`${path}/profile`, payload);
};
