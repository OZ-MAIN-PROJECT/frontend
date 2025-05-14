import { END_POINT } from '@/constants/route';
import api from './api';
import { User } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';

// 로그인
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  nickname: string;
  refresh : string;
  role : string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(END_POINT.USERS_LOGIN, payload);
  const {access, refresh, nickname, role} = response.data;

  const user = {nickname, role};
  console.log('로그인 응답 : ', response)
  // 상태 저장
  useAuthStore.getState().setAuth(access, refresh, user);

  return response.data;
};

// 회원가입
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  nickname: string;
  question: string;
  answer: string;
}

export interface SignupResponse {
  code: string | number;
  message: string;
}

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  const response = await api.post(END_POINT.USERS_SIGNUP, payload);
  return response.data;
};

// refresh 토큰 재발급 요청
export const getRefreshToken = async () => {
  const refresh_token = useAuthStore.getState().refresh_token;
  if (!refresh_token) throw new Error('refresh_token 없음')
  const response = await api.post(END_POINT.TOKEN_REFRESH, {refresh : refresh_token});
  return response.data;
}

// 내 정보 조회
export const getMyInfo = async () : Promise<User> => {
  const response = await api.get<User>(END_POINT.USERS_MYPAGE);
  console.log('마이페이지 응답 : ', response.data)
  return response.data;
};

// 내 정보 수정 (닉네임, 비밀번호)
export const updateNickname = async (nickname: string) => {
  const response = await api.patch(END_POINT.USERS_MYPAGE, { nickname });
  return response.data;
};

export const updatePassword = async (password: string) => {
  const response = await api.patch(END_POINT.USERS_MYPAGE, { password });
  return response.data;
};

// 비밀번호 찾기

// 회원 탈퇴
export const deleteUser = async (password: string) => {
  const response = await api.delete(END_POINT.USERS_MYPAGE, { params: { password } });
  return response.data;
};
