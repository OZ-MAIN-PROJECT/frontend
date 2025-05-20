import { BASE_URL } from '@/constants/route';
import { useAuthStore } from '@/stores/useAuthStore';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getRefreshToken } from './authApi';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 모든 요청의 헤더에 토큰 포함할 수 있도록
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().access_token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request URL:', config.url);
  return config;
});

// 401(인증 오류) : 자동 토큰 재발급
api.interceptors.response.use(
  // 성공 응답 그대로
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // 401 만료 받고 아직 재시도 안한 경우
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const { access: new_access } = await getRefreshToken();
        const { setAuth, refresh_token, user } = useAuthStore.getState();
        if (!user || !refresh_token) throw new Error('인증 정보 부족');

        setAuth(new_access, refresh_token, user);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${new_access}`;
        }

        return axios(originalRequest);
      } catch (refreshError) {
        console.log('토큰 갱신 실패', refreshError);
        useAuthStore.getState().setLogout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
