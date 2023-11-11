import { api } from '@/utils/api.ts';
import { Verification, SUBSCRIPTION_STATUS } from '@/utils/interfaces.ts';

const path = '/verification';

export interface VerificationsResponse {
  data: { verifications: Verification[]; count: number };
}

export interface ManageVerificationPayload {
  username: string;
  name: string;
  status: SUBSCRIPTION_STATUS;
}
export const getUserVerifications = async ({ page, take }: { page: number; take: number }) => {
  const res = (await api.get(`${path}?page=${page}&take=${take}`)).data as VerificationsResponse;
  return res.data;
};

export const manageVerification = async (payload: ManageVerificationPayload) => {
  const res = (await api.put(`${path}`, payload)).data as VerificationsResponse;
  return res.data;
};
