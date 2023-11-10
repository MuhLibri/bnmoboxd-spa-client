export interface BaseResponse {
  message: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  isAdmin: boolean;
}

export interface CuratorReview {
  id?: number;
  filmId: number;
  review: string;
  rating: number;
  updatedAt?: string;
}

export interface Token {
  exp: string;
  iap: string;
  user: User;
}

export interface Film {
  id: number;
  title: string;
}

export type SUBSCRIPTION_STATUS = 'PENDING' | 'ACCEPTED' | 'REJECTED';
export interface Subscription {
  curatorUsername: string;
  subscriberUsername: string;
  status: SUBSCRIPTION_STATUS;
}
