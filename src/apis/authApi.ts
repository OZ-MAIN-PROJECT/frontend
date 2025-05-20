import { END_POINT } from '@/constants/route';
import api from './api';
import { MyPostList, MyPostType, User } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';

// 로그인
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  nickname: string;
  refresh: string;
  role: 'user' | 'admin';
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(END_POINT.USERS_LOGIN, payload);
  const { access, refresh, nickname, role } = response.data;

  const user = { nickname, role };
  console.log('로그인 응답 : ', response);
  // 상태 저장
  useAuthStore.getState().setAuth(access, refresh, user);

  return response.data;
};

// 로그아웃
export const logout = async () => {
  const refresh_token = useAuthStore.getState().refresh_token;
  const logoutStore = useAuthStore.getState().setLogout;
  await api.post(END_POINT.USERS_LOGOUT, { refresh: refresh_token });
  logoutStore();
  console.log('로그아웃 응답 : ', logoutStore);
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

// 이메일&닉네임 중복 확인
export const emailDuplicateCheck = async (email: string) => {
  const response = await api.get(END_POINT.USERS_DUPLICATE_CHECK, { params: { email } });
  return response.data;
};

export const nicknameDuplicateCheck = async (nickname: string) => {
  const response = await api.get(END_POINT.USERS_DUPLICATE_CHECK, { params: { nickname } });
  return response.data;
};

// refresh 토큰 재발급 요청
export const getRefreshToken = async () => {
  const refresh_token = useAuthStore.getState().refresh_token;
  if (!refresh_token) throw new Error('refresh_token 없음');
  const response = await api.post(END_POINT.TOKEN_REFRESH, { refresh: refresh_token });
  return response.data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<User> => {
  const response = await api.get<User>(END_POINT.USERS_MYPAGE);
  console.log('마이페이지 응답 : ', response.data);
  return response.data;
};

// 내 정보 수정 (닉네임, 비밀번호)
export const updateNickname = async (nickname: string) => {
  const response = await api.put(END_POINT.USERS_MYPAGE, { nickname });
  return response.data;
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const response = await api.post(END_POINT.USERS_CHANGE_PASSWORD, {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return response.data;
};

// 내 포스트 조회
export interface MyPostListPayload {
  type: MyPostType;
  page: number;
  size: number;
}

export const getMyPosts = async ({ type, page, size }: MyPostListPayload) => {
  const params: any = { page, size };
  if (type === 'liked') params.filter = 'liked';

  const response = await api.get(END_POINT.MYPAGE_POSTS, { params });
  return response.data;
};


// 비밀번호 찾기
export interface FindPasswordPayload {
  email: string;
  question: string;
  answer: string;
}

export const findPassword = async (payload: FindPasswordPayload) => {
  const response = await api.post(END_POINT.USERS_FIND_PASSWORD, payload);
  console.log(response.data);
  return response.data;
};

// 비밀번호 초기화
export const resetPassword = async (email: string, newPassword: string) => {
  const response = await api.post(END_POINT.USERS_RESET_PASSWORD, { email, new_password: newPassword });
  console.log(response.data);
  return response.data;
};

// 회원 탈퇴
export const deleteUser = async (password: string) => {
  const response = await api.delete(END_POINT.USERS_MYPAGE, { data: { password } });
  return response.data;
};
