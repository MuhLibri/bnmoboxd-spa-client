import axios from 'axios';
import { getToken } from '@/utils/token-storage.ts';
import { VITE_REST_API_URL } from '@/utils/config.ts';

export const api = axios.create({
  baseURL: VITE_REST_API_URL,
});

api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
