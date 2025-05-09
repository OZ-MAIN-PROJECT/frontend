import { BASE_URL } from '@/constants/route';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api