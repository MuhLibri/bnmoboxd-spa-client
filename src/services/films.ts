import { api } from '@/utils/api.ts';
import { BaseResponse, Film } from '@/utils/interfaces.ts';

export interface GetFilmResponse extends BaseResponse {
  data: Film[];
}
export const getFilmTitles = async (search: string) => {
  const response = await api.get(`/film?query=${search}&page=1&take=10`);
  const res = response.data as GetFilmResponse;
  console.log(res);
  return res.data;
};
