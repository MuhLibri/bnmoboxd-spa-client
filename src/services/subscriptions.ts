import { api } from '@/utils/api.ts';
import { Subscription, SUBSCRIPTION_STATUS } from '@/utils/interfaces.ts';

const path = '/subscription';

export interface SubscriptionsData {
  subscriptions: Subscription[];
  count: number;
}
export interface SubscriptionsResponse {
  data: SubscriptionsData;
}

export interface ManageSubscriptionPayload {
  curatorUsername: string;
  subscriberUsername: string;
  status: SUBSCRIPTION_STATUS;
}
export const getSubscriptions = async ({ page, take }: { page: number; take: number }) => {
  const res = (await api.get(`${path}?page=${page}&take=${take}`)).data as SubscriptionsResponse;
  return res.data;
};

export const manageSubscription = async (payload: ManageSubscriptionPayload) => {
  const res = (await api.put(`${path}`, payload)).data as SubscriptionsResponse;
  return res.data;
};
