import { api } from '@/utils/api.ts';
import { UserVerification } from '@/utils/interfaces.ts';

const path = '/verification';

export interface UserVerificationData {
  userVerifications: UserVerification[];
  count: number;
}
export interface VerificationsResponse {
  data: UserVerificationData;
}

export const getUserVerifications = async ({ page, take }: { page: number; take: number }) => {
  const res = (await api.get(`${path}?page=${page}&take=${take}`)).data as VerificationsResponse;
  return res.data;
};

export const acceptVerification = async (userId: number) => {
  const res = (await api.put(`${path}/${userId}/verify`)).data as VerificationsResponse;
  return res.data;
};

export const rejectVerification = async (userId: number) => {
  const res = (await api.put(`${path}/${userId}/reject`)).data as VerificationsResponse;
  return res.data;
};
