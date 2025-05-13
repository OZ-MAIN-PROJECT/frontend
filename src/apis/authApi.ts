import { END_POINT } from '@/constants/route';
import api from './instance';

// 로그인
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  nickname: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post(END_POINT.USERS_LOGIN, payload);
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

// 내 정보 조회
export const getMyInfo = async () => {
  const response = await api.get(END_POINT.USERS_MYPAGE);
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
