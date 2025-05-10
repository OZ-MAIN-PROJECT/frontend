import { END_POINT } from '@/constants/route';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  nickname: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(END_POINT.USERS_LOGIN, payload);
  return response.data;
};
