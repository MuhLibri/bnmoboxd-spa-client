import { api } from '@/utils/api.ts';
import { BaseResponse, CuratorReview } from '@/utils/interfaces.ts';

export interface CreatedCuratorReview extends CuratorReview {
  id: number;
  film: string;
}
interface CuratorReviewsResponse extends BaseResponse {
  data: {
    reviews: CreatedCuratorReview[];
    count: number;
  };
}
interface CuratorReviewResponse {
  data: CreatedCuratorReview;
}
type PostCuratorReviewPayload = CuratorReview;
type PutCuratorReviewPayload = CuratorReview;

const path = '/curator-review';
export const getCuratorReviews = async ({ page, take }: { page: number; take: number }) => {
  const res = (await api.get(`${path}?page=${page}&take=${take}`)).data as CuratorReviewsResponse;
  return res.data;
};

export const postCuratorReview = async (payload: PostCuratorReviewPayload) => {
  const res = (await api.post(`${path}`, payload)).data as CuratorReviewResponse;
  return res.data;
};

export const putCuratorReview = async (payload: PutCuratorReviewPayload, id: number) => {
  const res = (await api.put(`${path}/${id}`, payload)).data as CuratorReviewResponse;
  return res.data;
};

export const deleteCuratorReview = async (id: number) => {
  const res = (await api.delete(`${path}/${id}`)).data as CuratorReviewResponse;
  return res.data;
};
